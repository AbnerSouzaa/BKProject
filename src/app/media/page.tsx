'use client';

import Header from '@/src/components/Header';
import FilterBar from '@/src/components/FilterBar';
import MediaTable from '@/src/components/MediaTable';
import Pagination from '@/src/components/Pagination';
import UploadMediaForm from '@/src/components/UploadMediaForm';
import { fetchMedia } from '@/src/utils/api';
import { useEffect, useState } from 'react';
import { EntertainmentMedia } from '@/src/utils/types';
import styled from 'styled-components';

const MainContainer = styled.div`
  transition: filter 0.3s ease;
  &.dimmed {
    filter: brightness(0.7); 
  }
`;

const TransparentOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); 
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 999;

  &.visible {
    visibility: visible;
    opacity: 1;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
  color: ${({ theme }) => theme.colors.text};
`;

const TitleWrapper = styled.div`
  max-width: 1200px; /* Alinhamento com o conteúdo */
  margin: 0 auto; 
  padding: 0 1rem;
`;

export default function MediaPage() {
  const [allData, setAllData] = useState<EntertainmentMedia[]>([]);
  const [filteredData, setFilteredData] = useState<EntertainmentMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    async function getMedia() {
      try {
        setLoading(true);
        const media = await fetchMedia();
        setAllData(media);
        setFilteredData(media);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    getMedia();
  }, []);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleFilter = (category: string, searchTerm: string) => {
    const filtered = allData.filter((item) => {
      const matchesCategory = category ? item.category === category : true;
      const titleDefault = typeof item.title?.default === 'string' ? item.title.default : '';
      const matchesSearch = titleDefault.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredData(filtered);
    setCurrentPage(1); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />

      <TitleWrapper>
        <PageTitle>Media</PageTitle> {}
      </TitleWrapper>

      <MainContainer className={isUploadOpen ? 'dimmed' : ''}>
        <FilterBar
          categories={[...new Set(allData.map((item) => item.category))]}
          onFilter={handleFilter}
          onUpload={() => setIsUploadOpen(true)}
        />
        <MediaTable data={currentData} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / rowsPerPage)}
          rowsPerPage={rowsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
      </MainContainer>

      <TransparentOverlay
        className={isUploadOpen ? 'visible' : ''}
        onClick={() => setIsUploadOpen(false)}
      />

      {isUploadOpen && (
        <UploadMediaForm onClose={() => setIsUploadOpen(false)} />
      )}
    </>
  );
}
