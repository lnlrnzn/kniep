import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Calculate which page numbers to show
  const createPageLinks = () => {
    const pages: (number | string)[] = [];
    
    // Always show the first page
    pages.push(1);
    
    // Calculate range of pages to show around current page
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust the range if current page is close to the start
    if (currentPage <= 3) {
      rangeEnd = Math.min(5, totalPages - 1);
    }
    
    // Adjust the range if current page is close to the end
    if (currentPage >= totalPages - 2) {
      rangeStart = Math.max(2, totalPages - 4);
    }
    
    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push('ellipsis-1');
    }
    
    // Add the range of pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis-2');
    }
    
    // Always show the last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pageLinks = createPageLinks();
  
  return (
    <nav aria-label="Pagination" className="flex justify-center my-10">
      <ul className="flex items-center gap-1">
        {/* Previous page button */}
        <li>
          <Button
            asChild={currentPage > 1}
            variant="outline"
            size="icon"
            className={currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""}
            disabled={currentPage <= 1}
          >
            {currentPage > 1 ? (
              <Link href={`${basePath}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}>
                <span className="sr-only">Vorherige Seite</span>
                <ChevronLeft className="h-4 w-4" />
              </Link>
            ) : (
              <span>
                <span className="sr-only">Vorherige Seite</span>
                <ChevronLeft className="h-4 w-4" />
              </span>
            )}
          </Button>
        </li>
        
        {/* Page links */}
        {pageLinks.map((page, i) => {
          // Render ellipsis
          if (page === 'ellipsis-1' || page === 'ellipsis-2') {
            return (
              <li key={`${page}`}>
                <span className="flex h-9 w-9 items-center justify-center">
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              </li>
            );
          }
          
          // Render page number
          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;
          return (
            <li key={`page-${pageNum}`}>
              <Button
                asChild={!isCurrentPage}
                variant={isCurrentPage ? "default" : "outline"}
                size="icon"
                className="h-9 w-9"
              >
                {!isCurrentPage ? (
                  <Link href={`${basePath}${pageNum > 1 ? `?page=${pageNum}` : ''}`}>
                    <span className="sr-only">Seite {pageNum}</span>
                    <span aria-hidden="true">{pageNum}</span>
                  </Link>
                ) : (
                  <span>
                    <span className="sr-only">Seite {pageNum}</span>
                    <span aria-hidden="true">{pageNum}</span>
                  </span>
                )}
              </Button>
            </li>
          );
        })}
        
        {/* Next page button */}
        <li>
          <Button
            asChild={currentPage < totalPages}
            variant="outline"
            size="icon"
            className={currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""}
            disabled={currentPage >= totalPages}
          >
            {currentPage < totalPages ? (
              <Link href={`${basePath}?page=${currentPage + 1}`}>
                <span className="sr-only">Nächste Seite</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span>
                <span className="sr-only">Nächste Seite</span>
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </li>
      </ul>
    </nav>
  );
} 