import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const CustomBreadcrumb = styled(Breadcrumb)`
  .ant-breadcrumb-link {
    color: #9E9DA8;
    font-weight: 500;
    font-size: 18px;
  }

  .ant-breadcrumb-link:hover {
    color: #3b82f6;
    text-decoration: underline;
  }

  .ant-breadcrumb-separator {
    color: #9ca3af;
    font-size: 18px;
  }

  background-color: #f3f4f6;
  padding: 4px;
  border-radius: 8px;
`;

const BreadcrumbNav = () => {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn là trang chủ ('/')
  if (location.pathname === '/') {
    return null; // Không render breadcrumb ở trang chủ
  }

  // Tách đường dẫn thành các phần
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const items = [
    {
      title: <Link to="/" className="text-gray-800 hover:text-blue-500">Trang chủ</Link>,
      key: 'home',
    },
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const isLast = index === pathSnippets.length - 1;

      return {
        title: isLast ? (
          <span style={{ color: '#1A162E', fontWeight: 'bold', fontSize: '18px' }}>
            {_}
          </span>
        ) : (
          <Link to={url} className="text-gray-800 hover:text-blue-500">
            {_}
          </Link>
        ),
        key: url,
      };
    }),
  ];

  return (
    <div className="container mx-auto rounded-xl mt-10 shadow-lg p-4 flex items-center">
      <CustomBreadcrumb separator=">" items={items} />
    </div>
  );
};

export default BreadcrumbNav;
