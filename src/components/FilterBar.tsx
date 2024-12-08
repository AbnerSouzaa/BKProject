'use client';

import styled from 'styled-components';
import { useState } from 'react';

const FilterBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
`;

const FilterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.colors.tableRow};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid #444;
  padding: 0.2rem 0.4rem;
  width: 200px;
  border-radius: 15px;
  font-size: 12px;
`;

const Dropdown = styled.select`
  background-color: ${({ theme }) => theme.colors.tableRow};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid #444;
  padding: 0.2rem 0.4rem;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
`;

const UploadButton = styled.button`
  background-color: #32cd32;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 0.3rem 0.8rem;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #28a745;
  }
`;

interface FilterBarProps {
  categories: string[];
  onFilter: (category: string, searchTerm: string) => void;
  onUpload: () => void; 
}

export default function FilterBar({ categories = [], onFilter, onUpload }: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onFilter(category, searchTerm);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onFilter(selectedCategory, term);
  };

  return (
    <FilterWrapper>
      <FilterBarContainer>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Dropdown value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/_/g, ' ')}
              </option>
            ))}
          </Dropdown>
          <SearchInput
            type="text"
            placeholder="Search uploads"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <UploadButton onClick={onUpload}>+ Upload Media</UploadButton>
      </FilterBarContainer>
    </FilterWrapper>
  );
}
