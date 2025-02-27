const fs = require('fs');
const path = require('path');

// Path to your Google Maps hotels dataset
const INPUT_FILE = './app/data/hotels.json';
// Output file path
const OUTPUT_FILE = './app/data/accommodations.json';

// Read the Google Maps hotel data
try {
  const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  console.log(`📖 Read ${rawData.length} hotels from dataset`);
  
  // Function to determine accommodation type based on Google Maps data
  function determineType(hotel) {
    const title = typeof hotel.title === 'string' ? hotel.title.toLowerCase() : '';
    const description = typeof hotel.description === 'string' ? hotel.description.toLowerCase() : '';
    const categories = Array.isArray(hotel.categories) ? hotel.categories : [];
    const categoriesLower = categories.map(c => typeof c === 'string' ? c.toLowerCase() : '');
    
    if (categoriesLower.includes('hotel') || title.includes('hotel') || 
        description.includes('hotel')) {
      return 'hotel';
    } else if (categoriesLower.includes('pension') || title.includes('pension') || 
               description.includes('pension')) {
      return 'pension';
    } else if (categoriesLower.includes('ferienhaus') || title.includes('ferienhaus') || 
               description.includes('ferienhaus') || title.includes('haus') || 
               description.includes('haus')) {
      return 'ferienhaus';
    } else {
      return 'ferienwohnung';
    }
  }
  
  // Function to determine price range from the price data
  function determinePriceRange(hotel) {
    const price = typeof hotel.price === 'string' ? hotel.price.replace(/[^0-9]/g, '') : '';
    const priceNum = parseInt(price, 10);
    
    if (isNaN(priceNum)) return '€€';
    
    if (priceNum < 100) return '€';
    if (priceNum < 150) return '€€';
    if (priceNum < 200) return '€€€';
    return '€€€€';
  }
  
  // Extract features from hotel data
  function extractFeatures(hotel) {
    const features = [];
    
    // Extract from hotel description
    if (typeof hotel.hotelDescription === 'string') {
      const description = hotel.hotelDescription.toLowerCase();
      
      if (description.includes('wlan') || description.includes('wifi') || description.includes('wi-fi')) {
        features.push('WLAN');
      }
      
      if (description.includes('parkplatz') || description.includes('parken')) {
        features.push('Parkplatz');
      }
      
      if (description.includes('frühstück') || description.includes('breakfast')) {
        features.push('Frühstück');
      }
      
      if (description.includes('sauna')) {
        features.push('Sauna');
      }
      
      if (description.includes('pool') || description.includes('schwimmbad')) {
        features.push('Pool');
      }
      
      if (description.includes('meer') || description.includes('meerblick') || 
          description.includes('strand') || description.includes('ocean view')) {
        features.push('Meerblick');
      }
      
      if (description.includes('balkon') || description.includes('terrasse') || 
          description.includes('balcony') || description.includes('terrace')) {
        features.push('Balkon/Terrasse');
      }
      
      if (description.includes('restaurant')) {
        features.push('Restaurant');
      }
      
      if (description.includes('bar')) {
        features.push('Bar');
      }
      
      if (description.includes('spa')) {
        features.push('Spa');
      }
      
      if (description.includes('fahrrad') || description.includes('bicycle') || 
          description.includes('bike')) {
        features.push('Fahrradverleih');
      }
    }
    
    // Add from additional info if available
    if (hotel.additionalInfo && hotel.additionalInfo.Amenities) {
      const amenities = hotel.additionalInfo.Amenities;
      
      amenities.forEach(amenity => {
        if (amenity['Kostenloses WLAN']) {
          if (!features.includes('WLAN')) features.push('WLAN');
        }
      });
    }
    
    // Ensure unique features
    return [...new Set(features)];
  }
  
  // Extract stars rating from hotel data
  function extractStars(hotel) {
    const hotelStars = typeof hotel.hotelStars === 'string' ? hotel.hotelStars : '';
    const match = hotelStars.match(/(\d+)/);
    
    if (match) {
      return parseInt(match[1], 10);
    }
    
    // Fallback to a rating based on the totalScore
    if (typeof hotel.totalScore === 'number') {
      if (hotel.totalScore >= 4.5) return 5;
      if (hotel.totalScore >= 4.0) return 4;
      if (hotel.totalScore >= 3.5) return 3;
      if (hotel.totalScore >= 3.0) return 2;
      if (hotel.totalScore >= 2.0) return 1;
    }
    
    return 0;
  }
  
  // Get a clean city from address
  function extractCity(hotel) {
    if (typeof hotel.city === 'string' && hotel.city.trim()) {
      return hotel.city.trim();
    }
    
    if (typeof hotel.address === 'string') {
      const parts = hotel.address.split(',');
      if (parts.length >= 2) {
        // Try to extract the city part
        const cityPart = parts[parts.length - 2].trim();
        return cityPart;
      }
    }
    
    return 'Amrum';
  }
  
  // Create slugified ID from name
  function createId(name, index) {
    if (typeof name !== 'string' || !name.trim()) {
      return `accommodation-${index}`;
    }
    
    return `accommodation-${name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')}-${index}`;
  }
  
  // Transform hotel data to our accommodation format
  function transformHotelData(hotelsData) {
    console.log('👷 Starting to transform hotels...');
    
    // Take only the first 30 hotels for better performance
    const hotels = hotelsData.slice(0, 30);
    
    return hotels.map((hotel, index) => {
      // Create a unique ID
      const id = createId(hotel.title, index);
      
      // Get image URL
      let imageUrl = '';
      if (typeof hotel.imageUrl === 'string' && hotel.imageUrl.trim()) {
        imageUrl = hotel.imageUrl;
      }
      
      // If no image is available, use a placeholder
      if (!imageUrl) {
        const type = determineType(hotel);
        if (type === 'hotel') {
          imageUrl = '/images/accommodations/hotel-1.jpg';
        } else if (type === 'pension') {
          imageUrl = '/images/accommodations/pension-1.jpg';
        } else if (type === 'ferienhaus') {
          imageUrl = '/images/accommodations/ferienhaus-1.jpg';
        } else {
          imageUrl = '/images/accommodations/ferienwohnung-1.jpg';
        }
      }
      
      // Build the description
      let description = '';
      if (typeof hotel.description === 'string' && hotel.description.trim()) {
        description = hotel.description;
      } else if (typeof hotel.hotelDescription === 'string' && hotel.hotelDescription.trim()) {
        // Take the first sentence or two
        const sentences = hotel.hotelDescription.split('.');
        if (sentences.length > 0) {
          description = sentences.slice(0, 2).join('.') + '.';
        }
      }
      
      return {
        id,
        name: typeof hotel.title === 'string' ? hotel.title : `Unterkunft auf Amrum ${index + 1}`,
        type: determineType(hotel),
        price: determinePriceRange(hotel),
        location: typeof hotel.address === 'string' ? hotel.address : 'Amrum',
        city: extractCity(hotel),
        description,
        image: imageUrl,
        features: extractFeatures(hotel),
        stars: extractStars(hotel),
        website: typeof hotel.website === 'string' ? hotel.website : '',
        phone: typeof hotel.phone === 'string' ? hotel.phone : '',
        rating: typeof hotel.totalScore === 'number' ? hotel.totalScore : 0
      };
    });
  }
  
  // Process the data
  const transformedData = transformHotelData(rawData);
  
  // Write the transformed data to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transformedData, null, 2));
  console.log(`✅ Successfully transformed and wrote ${transformedData.length} accommodations to ${OUTPUT_FILE}`);
  
} catch (error) {
  console.error('❌ Error processing hotel data:', error);
} 