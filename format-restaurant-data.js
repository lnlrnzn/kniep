const fs = require('fs');
const path = require('path');

// Path to your Google Maps dataset
const INPUT_FILE = './dataset_google-maps-extractor.json';
// Output file path
const OUTPUT_FILE = './app/data/restaurants.json';

// Read the Google Maps data
try {
  const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  console.log(`📖 Read ${rawData.length} places from dataset`);
  
  // Function to determine restaurant type based on Google Maps data
  function determineType(restaurant) {
    const title = typeof restaurant.title === 'string' ? restaurant.title.toLowerCase() : '';
    const categories = Array.isArray(restaurant.categories) ? restaurant.categories : [];
    const categoriesLower = categories.map(c => typeof c === 'string' ? c.toLowerCase() : '');
    
    if (categoriesLower.includes('café') || categoriesLower.includes('coffee shop') || 
        categoriesLower.includes('bakery') || title.includes('café') || title.includes('cafe')) {
      return 'cafe';
    } else if (categoriesLower.includes('beach bar') || categoriesLower.includes('bar') || 
               title.includes('strandbar') || title.includes('beach bar')) {
      return 'beach-bar';
    } else {
      return 'restaurant';
    }
  }
  
  // Function to determine price range
  function determinePriceRange(restaurant) {
    if (restaurant.priceRange) {
      // If the data already has a priceRange field, use it
      const priceLevel = restaurant.priceRange.length;
      if (priceLevel === 1) return '€';
      if (priceLevel === 2) return '€€';
      if (priceLevel === 3) return '€€€';
      if (priceLevel >= 4) return '€€€€';
    } else if (restaurant.price_level) {
      // Alternative field name
      const priceLevel = restaurant.price_level;
      if (priceLevel === 1) return '€';
      if (priceLevel === 2) return '€€';
      if (priceLevel === 3) return '€€€';
      if (priceLevel >= 4) return '€€€€';
    }
    
    // Default if no price information is available
    return '€€';
  }
  
  // Function to extract cuisine
  function extractCuisine(restaurant) {
    if (Array.isArray(restaurant.categories) && restaurant.categories.length > 0) {
      // Filter out non-cuisine categories
      const nonCuisineTerms = ['restaurant', 'café', 'cafe', 'bar', 'eatery', 'diner'];
      const cuisineCategories = restaurant.categories.filter(
        cat => typeof cat === 'string' && !nonCuisineTerms.some(term => cat.toLowerCase().includes(term))
      );
      
      if (cuisineCategories.length > 0) {
        return cuisineCategories[0]; // Return the first cuisine category
      }
    }
    
    // Default if no cuisine information is available
    return 'Norddeutsch';
  }
  
  // Function to extract features
  function extractFeatures(restaurant) {
    const features = [];
    
    // Extract from amenities if available
    if (restaurant.amenities) {
      for (const category in restaurant.amenities) {
        const amenities = restaurant.amenities[category];
        amenities.forEach(amenity => {
          for (const key in amenity) {
            if (amenity[key] === true) {
              features.push(key);
            }
          }
        });
      }
    }
    
    // Add location-based features - Fix the TypeError by checking type properly
    const location = typeof restaurant.location === 'string' ? restaurant.location.toLowerCase() : '';
    const address = typeof restaurant.address === 'string' ? restaurant.address.toLowerCase() : '';
    
    if (location.includes('strand') || address.includes('strand')) {
      features.push('Strandnähe');
    }
    
    if (location.includes('hafen') || address.includes('hafen')) {
      features.push('Hafenblick');
    }
    
    // If we don't have enough features, add some defaults
    if (features.length < 2) {
      features.push('Gemütliche Atmosphäre');
      features.push('Nordseeküche');
    }
    
    // Limit to most important features and remove duplicates
    return [...new Set(features)].slice(0, 5);
  }
  
  // Function to format opening hours
  function formatOpeningHours(restaurant) {
    // Check if we have structured opening hours
    if (Array.isArray(restaurant.openingHours) && restaurant.openingHours.length > 0) {
      // Try to extract the day and hours information
      try {
        const daysMap = {
          0: 'Montag',
          1: 'Dienstag',
          2: 'Mittwoch',
          3: 'Donnerstag', 
          4: 'Freitag',
          5: 'Samstag',
          6: 'Sonntag'
        };
        
        const formattedHours = restaurant.openingHours.map(hours => {
          if (typeof hours === 'object' && hours !== null) {
            // Try to extract day and hours
            const day = hours.day !== undefined ? daysMap[hours.day] : 
                        (hours.dayOfWeek !== undefined ? daysMap[hours.dayOfWeek] : '');
            
            let hourText = '';
            if (hours.hours) {
              hourText = hours.hours;
            } else if (hours.open && hours.close) {
              hourText = `${hours.open} - ${hours.close}`;
            } else if (hours.text) {
              hourText = hours.text;
            }
            
            if (day && hourText) {
              return `${day}: ${hourText}`;
            }
          }
          return null;
        }).filter(Boolean);
        
        if (formattedHours.length > 0) {
          return formattedHours.join('\n');
        }
      } catch (error) {
        console.log('Error formatting opening hours:', error.message);
      }
    } 
    
    // Alternative field names
    if (restaurant.workingHours) {
      return restaurant.workingHours;
    }
    
    // Default hours if everything else fails
    return 'Täglich 11:00-22:00 Uhr (Bitte vor Besuch aktualisierte Öffnungszeiten prüfen)';
  }
  
  // Function to format specialties
  function extractSpecialties(restaurant) {
    const specialties = [];
    
    // Add default specialties based on cuisine
    const cuisine = extractCuisine(restaurant);
    const cuisineLower = typeof cuisine === 'string' ? cuisine.toLowerCase() : '';
    
    if (cuisineLower.includes('fisch') || cuisineLower.includes('seafood')) {
      specialties.push('Fangfrischer Fisch', 'Meeresfrüchte');
    } else if (cuisineLower.includes('deutsch') || cuisineLower.includes('friesisch')) {
      specialties.push('Regionale Spezialitäten', 'Hausgemachte Gerichte');
    } else if (cuisineLower.includes('café') || cuisineLower.includes('bakery')) {
      specialties.push('Hausgemachte Kuchen', 'Friesische Torte');
    }
    
    // Add more default specialties if needed
    const title = typeof restaurant.title === 'string' ? restaurant.title.toLowerCase() : '';
    if (title.includes('strand') || determineType(restaurant) === 'beach-bar') {
      specialties.push('Cocktails', 'Leichte Gerichte');
    }
    
    // Return default specialties if we found some, otherwise generic ones
    return specialties.length > 0 ? specialties : ['Amrumer Küche', 'Saisonale Gerichte', 'Fangfrischer Fisch'];
  }
  
  // Function to generate a slug/ID from the name
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  
  // Transform the Google Maps data to our restaurant format
  function transformRestaurantData(gmapsData) {
    console.log('👷 Starting to transform restaurants...');
    
    // Since all entries are restaurants/food places, we don't need to filter,
    // just transform them into our format
    const restaurants = gmapsData;
    
    console.log(`🍽️ Processing ${restaurants.length} restaurants/cafes/bars`);
    
    // Log the titles for debugging
    console.log('✅ Restaurant titles (first 5):');
    restaurants.slice(0, 5).forEach(place => console.log(`- ${place.title || 'No title'}`));
    
    // Transform to our format
    return restaurants.map((restaurant, index) => {
      // Create a unique ID
      const safeTitle = typeof restaurant.title === 'string' ? restaurant.title : `place-${index}`;
      const id = `restaurant-${slugify(safeTitle)}-${index}`;
      
      // Create a description if none exists
      let description = typeof restaurant.description === 'string' ? restaurant.description : '';
      if (!description) {
        const type = determineType(restaurant);
        const cuisine = extractCuisine(restaurant);
        if (type === 'cafe') {
          description = `Gemütliches Café auf Amrum mit ${cuisine}-Spezialitäten und hausgemachten Kuchen.`;
        } else if (type === 'beach-bar') {
          description = `Entspannte Strandbar direkt am Meer. Genießen Sie Cocktails und leichte Snacks mit Meerblick.`;
        } else {
          description = `${cuisine} Restaurant auf Amrum mit gemütlicher Atmosphäre und regionalen Spezialitäten.`;
        }
      }
      
      // Get the right image URL
      let imageUrl = null;
      if (typeof restaurant.imageUrl === 'string') {
        imageUrl = restaurant.imageUrl;
      } else if (Array.isArray(restaurant.photos) && restaurant.photos.length > 0 && restaurant.photos[0].url) {
        imageUrl = restaurant.photos[0].url;
      }
      
      // If no image is available, use a placeholder
      if (!imageUrl) {
        const type = determineType(restaurant);
        if (type === 'cafe') {
          imageUrl = '/images/restaurants/cafe-1.jpg';
        } else if (type === 'beach-bar') {
          imageUrl = '/images/restaurants/beach-bar-1.jpg';
        } else {
          imageUrl = '/images/restaurants/restaurant-1.jpg';
        }
      }
      
      // Get safe location string
      const location = typeof restaurant.location === 'string' ? restaurant.location : 
                      (typeof restaurant.address === 'string' ? restaurant.address : 'Amrum');
      
      // Extract rating safely
      const rating = typeof restaurant.rating === 'number' ? restaurant.rating : 
                    (typeof restaurant.rating === 'string' ? parseFloat(restaurant.rating) : 4.5);
      
      return {
        id,
        name: typeof restaurant.title === 'string' ? restaurant.title : `Amrum Restaurant ${index + 1}`,
        type: determineType(restaurant),
        cuisine: extractCuisine(restaurant),
        priceRange: determinePriceRange(restaurant),
        location,
        description,
        image: imageUrl,
        openingHours: formatOpeningHours(restaurant),
        features: extractFeatures(restaurant),
        rating,
        specialties: extractSpecialties(restaurant)
      };
    });
  }
  
  // Main process
  try {
    // Transform the data
    const formattedRestaurants = transformRestaurantData(rawData);
    
    // Sort by rating (highest first)
    // If a place has no rating, assume it's a 4.0
    formattedRestaurants.sort((a, b) => (b.rating || 4.0) - (a.rating || 4.0));
    
    // Include all restaurants instead of just the top ones
    // You can still limit if you want by uncommenting the next line
    // const restaurantsToSave = formattedRestaurants.slice(0, 30);
    const restaurantsToSave = formattedRestaurants;
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(restaurantsToSave, null, 2));
    
    console.log(`✅ Successfully processed ${rawData.length} places`);
    console.log(`✅ Saved ${restaurantsToSave.length} restaurants to ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('❌ Error processing restaurant data:', error.message);
  }
} catch (error) {
  console.error('❌ Error reading input file:', error.message);
  console.log('Make sure the file exists at the correct path:', INPUT_FILE);
}