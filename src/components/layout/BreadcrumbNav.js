import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const CustomBreadcrumb = styled(Breadcrumb)`
  .ant-breadcrumb-link {
    font-weight: 500;
    font-size: 18px;

    a {
      display: inline-block;
      border-radius: 8px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgb(246,246,246); /* Màu nền khi hover */
        color: #000; /* Màu chữ khi hover */
      }
    }
  }

  .ant-breadcrumb-separator {
    font-size: 18px;
  }

  padding: 4px;
  border-radius: 8px;
`;


const BreadcrumbNav = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null; 
  }

  const pathSnippets = location.pathname.split('/').filter((i) => i).map((snippet) => decodeURIComponent(snippet));

  const items = [
    {
      title: <Link to="/" className=" ">Trang chủ</Link>,
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
          <Link to={url} className="text-gray-800 ">
            {_}
          </Link>
        ),
        key: url,
      };
    }),
  ];

  return (
    <div className="container mx-auto rounded-xl mt-3 flex items-center">
      <CustomBreadcrumb separator="/" items={items} />
    </div>
  );
};

export default BreadcrumbNav;
