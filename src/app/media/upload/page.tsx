'use client';

import Header from '@/src/components/Header';
import UploadMediaForm from '@/src/components/UploadMediaForm';
import { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function UploadPage() {
  const [isFormOpen, setIsFormOpen] = useState(true);

  return (
    <>
      <Header />
      <PageContainer>
        {isFormOpen && (
          <UploadMediaForm onClose={() => setIsFormOpen(false)} />
        )}
      </PageContainer>
    </>
  );
}
