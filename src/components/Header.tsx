import Image from 'next/image';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto 0 auto; /* Margem superior de 2rem */
  padding: 0.5rem;
  background-color: #0D0D0D;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem; /* Aumenta o espaço entre texto e imagem */
  padding: 0.5rem; /* Adiciona preenchimento interno */
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right; 
  font-size: 14px; /* Aumenta o tamanho da fonte */
`;

const Avatar = styled.img`
  width: 40px;  /* Aumenta a largura */
  height: 40px; /* Aumenta a altura */
  border-radius: 50%;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <Image src="/Logo.png" alt="Logo" width={40} height={40} />
      </Logo>
      <UserInfo>
        <UserDetails>
          <div style={{ fontSize: '14px' }}>Abner Souza</div>
          <div style={{ fontSize: '12px', color: '#888' }}>abner.dev@gmail.com</div>
        </UserDetails>
        <Avatar
          src="https://randomuser.me/api/portraits/men/75.jpg" 
          alt="User Avatar"
        />
      </UserInfo>
    </HeaderContainer>
  );
}
