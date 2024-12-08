'use client';

import styled from 'styled-components';

const RowsPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto; 
  margin-right: -1rem; 
  color: gray;
`;

const PageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageInfo = styled.span`
  color: white;
  font-size: 0.875rem;
  margin-left: 3rem;
  color: gray;
`;

const ShowingInfo = styled.div`
  font-size: 0.875rem;
  color: gray;
`;

const PaginationContainer = styled.div`
  max-width: 1200px; 
  margin: 0 auto; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem; 
  padding: 0 1rem;
`;

const RowsPerPageSelect = styled.select`
  background-color: #121212;
  color: white;
  border: 1px solid #444;
  border-radius: 3px;
  padding: 0.3rem; 
  font-size: 12px; 
`;

const PageButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 3px; 
  padding: 0.3rem 0.5rem; 
  font-size: 12px; 

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <PaginationContainer>
      <ShowingInfo>
        Showing {startItem} - {endItem} of {totalItems} items
      </ShowingInfo>

      <RowsPerPageContainer>
        Rows per page:
        <RowsPerPageSelect
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </RowsPerPageSelect>
      </RowsPerPageContainer>

      <PageButtonContainer>
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
        <PageButton
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
        >
          «
        </PageButton>
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          ‹
        </PageButton>
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          ›
        </PageButton>
        <PageButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
        >
          »
        </PageButton>
      </PageButtonContainer>
    </PaginationContainer>
  );
}
