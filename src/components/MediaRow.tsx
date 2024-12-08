'use client';

import styled from 'styled-components';
import { EntertainmentMedia } from '@/src/utils/types';

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.tableRowAlt};
  }

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.tableRow};
  }
`;

const TableCell = styled.td<{ align?: 'left' | 'right' | 'center'}>`
  padding: 0.8rem 1.2rem;
  text-align: ${({ align }) => align || 'left'};
  font-size: 12px;
  line-height: 1.2;

  &:nth-child(3) {
    color: gray; /* Define a cor da data como cinza */
  }

  &:nth-child(4) {
    text-align: right; /* Alinha o texto de Category à direita */
  }
`;

const CheckboxCell = styled.td`
  width: 30px;
  text-align: center;
`;

const StyledCheckbox = styled.input`
  appearance: none; /* Remove estilo padrão */
  -webkit-appearance: none; /* Compatibilidade com Safari */
  width: 16px;
  height: 16px;
  border: 2px solid #888; /* Borda cinza clara padrão */
  border-radius: 4px; /* Cantos arredondados */
  background-color: transparent; /* Fundo inicial transparente */
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #32cd32; /* Borda verde claro ao passar o mouse */
  }

  &:checked {
    border-color: #32cd32; /* Borda verde claro ao marcar */
    background-color: rgba(50, 205, 50, 0.2); /* Fundo verde escuro e transparente */
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const MediaId = styled.span`
  font-size: 10px;
  color: gray; /* Define a cor do ID como cinza */
`;

const CategoryLabel = styled.div<{ category: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Garante alinhamento à direita */
  gap: 0.5rem; /* Espaço consistente entre o ponto e o texto */
  color: ${({ category, theme }) => theme.colors.categoryColors[category] || theme.colors.text};
  font-weight: bold;

  &::before {
    content: '';
    display: inline-block;
    width: 8px; /* Tamanho do ponto */
    height: 8px; /* Tamanho do ponto */
    background-color: ${({ category, theme }) => theme.colors.categoryColors[category] || theme.colors.text};
    border-radius: 50%; /* Forma redonda */
    flex-shrink: 0; /* Garante que o ponto não encolha */
  }
`;

interface MediaRowProps {
  media: EntertainmentMedia;
}

// Função para formatar o texto da categoria
const formatCategory = (category: string): string => {
  if (category.toLowerCase().includes('literary_work')) {
    return 'Literary';
  }

  return category
    .toLowerCase()
    .split(/[_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

export default function MediaRow({ media }: MediaRowProps) {
  const categoryKey = media.category.toLowerCase().replace('_', '');

  return (
    <TableRow>
      <TableCell>
        <StyledCheckbox type="checkbox" />
      </TableCell>
      <TableCell>
        <TitleContainer>
          <span>{media.title.default}</span>
          <MediaId>{media.id}</MediaId> {}
        </TitleContainer>
      </TableCell>
      <TableCell align="right">
        <span style={{ color: 'gray' }}>
          {}
          {media.releaseDate ? new Date(media.releaseDate).toLocaleDateString() : 'N/A'}
        </span>
      </TableCell>
      <TableCell align="center">
        <CategoryLabel category={categoryKey}>
          {formatCategory(media.category)}
        </CategoryLabel>
      </TableCell>
    </TableRow>
  );
}
