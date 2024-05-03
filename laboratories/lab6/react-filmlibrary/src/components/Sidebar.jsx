import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

const SidebarFilters = (props) => {
    return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#1C2D5E">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a className="text-decoration-none" style={{ color: 'inherit' }}>
              Filters
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
              <CDBSidebarMenuItem icon="play" onClick={()=>props.filterFilms("All")}>All</CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="check" onClick={()=>props.filterFilms("Favorites")}>Favorites</CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="star" onClick={()=>props.filterFilms("Best rated")}>Best rated</CDBSidebarMenuItem> 
              <CDBSidebarMenuItem icon="history" onClick={()=>props.filterFilms("Seen last month")}>Seen last month</CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="eye-slash" onClick={()=>props.filterFilms("Unseen")}>Unseen</CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: '20px 5px',
              }}
            >
              --- WebApp Lab6 ---
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
};


export default SidebarFilters;