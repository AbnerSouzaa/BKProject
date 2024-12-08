'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Category, LiteraryWorkType } from '@/src/utils/types';

const FullScreenContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background-color: #000;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  overflow-y: auto;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #888;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: white;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%; 
  background-color: #121212;
  color: white;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: bold;
  color: white;
  display: block;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%; 
  background-color: #121212;
  color: white;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ClearButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const UploadButton = styled.button`
  background-color: #00D4A6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #00B896;
  }
`;

export default function UploadMediaForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [literaryType, setLiteraryType] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleClear = () => {
    setTitle('');
    setCategory('');
    setLiteraryType('');
    setReleaseDate('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body: any = { 
      title: { default: title }, 
      category,
      releaseDate, 
    };

    if (category === Category.LITERARY_WORK) {
      body.literaryType = literaryType;
    }

    await fetch('/api/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    alert('Media uploaded!');
  };

  return (
    <FullScreenContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <Title>Upload Media</Title>
      <Subtitle>Put the best files for BK Beta. 🤘</Subtitle>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Category</Label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {Object.values(Category).map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/_/g, ' ')}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Type your Title Media"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Data</Label>
          <Input
            type="text"
            placeholder="DD/MM/YYYY"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            pattern="\d{2}/\d{2}/\d{4}"
          />
        </div>
        {category === Category.LITERARY_WORK && (
          <div>
            <Label>Literary Type</Label>
            <Select
              value={literaryType}
              onChange={(e) => setLiteraryType(e.target.value)}
            >
              <option value="">Select Literary Type</option>
              {Object.values(LiteraryWorkType).map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ')}
                </option>
              ))}
            </Select>
          </div>
        )}
        <ButtonContainer>
          <ClearButton type="button" onClick={handleClear}>
            Clear All
          </ClearButton>
          <UploadButton type="submit">
            ✓ Upload Media
          </UploadButton>
        </ButtonContainer>
      </form>
    </FullScreenContainer>
  );
}
