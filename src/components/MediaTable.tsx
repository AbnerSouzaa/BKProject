'use client';

import styled from 'styled-components';
import MediaRow from './MediaRow';
import { EntertainmentMedia } from '@/src/utils/types';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 0.5rem;
  padding: 0.3rem;
  border-radius: 4px;
  background-color: #0D0D0D;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const TableHeader = styled.thead`
  background-color: #0D0D0D;
  text-transform: uppercase;
  font-size: 12px;
  border-bottom: 1px solid #333;

  th {
    padding: 0.4rem 1rem;
    text-align: left;

    &:nth-child(1) {
      width: 30px;
      text-align: center;
    }

    &:nth-child(2) {
      flex: 1;
      min-width: 200px;
    }

    &:nth-child(3) {
      width: 120px;
      text-align: right;
    }

    &:nth-child(4) {
      width: 180px;
      text-align: right;
    }
  }
`;

const TableCell = styled.td<{ align?: 'left' | 'right' | 'center' }>`
  padding: 0.4rem 1rem;
  text-align: ${({ align }) => align || 'left'};
  font-size: 12px;

  &:nth-child(1) {
    text-align: center; 
  }

  &:nth-child(3) {
    text-align: right;
  }

  &:nth-child(4) {
    text-align: right;
  }
`;

const CheckboxHeader = styled.th`
  width: 30px;
  text-align: center;
`;

interface MediaTableProps {
  data: EntertainmentMedia[]; 
}

export default function MediaTable({ data }: MediaTableProps) {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
      }}
    >
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <CheckboxHeader>
                <input type="checkbox" />
              </CheckboxHeader>
              <th>Media</th>
              <th>Release Date</th>
              <th>Category</th>
            </tr>
          </TableHeader>
          <tbody>
            {data && data.length > 0 ? (
              data.map((media) => <MediaRow key={media.id} media={media} />)
            ) : (
              <tr>
                <TableCell colSpan={4} align="center">
                  No data available for the selected filters.
                </TableCell>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
