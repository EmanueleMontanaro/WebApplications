import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
 
const SidebarFilters = (props) => {
  return (
    <Container className='container-fluid sidebar container'>
      <p className='h3 text-light mt-3'>Filters</p>
      <ButtonList editFilter={props.editFilter}/>
    </Container>
  );
   /*return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#1C2D5E">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a className="text-decoration-none" style={{ color: 'inherit' }}>
              Filters
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
              <Link className='btn' to='/'><i className='bi bi-play-fill'/>All</Link>
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
            WebApp Lab7
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );*/
};

function ButtonList(){
  return(
    <>
      {/*<Link className="Btn" style={{textDecoration: 'none', fontSize:'17px'}} to='/'>
        All
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-play-fill svgIcon" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
        </svg>
      </Link>
      <Link className="Btn" style={{textDecoration: 'none', fontSize:'17px'}} to='/favorites'>
        Favorites
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill svgIcon" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
      </Link>
      <Link className="Btn" style={{textDecoration: 'none', fontSize:'17px'}} to='/bestrated'>
        Best Rated
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-star-fill svgIcon" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
      </Link>
      <Link className="Btn" style={{textDecoration: 'none', fontSize:'15px'}} to='/seenlastmonth'>
        Seen last month
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-clock-history svgIcon" viewBox="0 0 16 16">
          <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
          <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
          <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
        </svg>
      </Link>
      <Link className="Btn" style={{textDecoration: 'none', fontSize:'17px'}} to='/unseen'>
        Unseen
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-eye-slash-fill svgIcon" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
      </Link> */}
      <Container className='mt-4 button-group'> 
  <Link className="value" style={{textDecoration: 'none'}} to='/'>
    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-play-fill" viewBox="0 0 16 16">
      <path fill="#FBFBFB" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
    </svg>
    All
  </Link>
  <Link className="value" style={{textDecoration: 'none'}} to='/favorites'>
    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill svgIcon" viewBox="0 0 16 16">
      <path fill="#FBFBFB"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
    </svg>
    Favorites
  </Link>
  <Link className="value" style={{textDecoration: 'none'}} to='/bestrated'>
    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-star-fill svgIcon" viewBox="0 0 16 16">
      <path fill="#FBFBFB" d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
    Best rated
  </Link>
  <Link className="value" style={{textDecoration: 'none'}} to='/seenlastmonth'> 
    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-clock-history svgIcon" viewBox="0 0 16 16">
      <path fill="#FBFBFB" d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
      <path fill="#FBFBFB" d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
      <path fill="#FBFBFB" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
    </svg>
    Seen last month
  </Link>
  <Link className="value" style={{textDecoration: 'none'}} to='/unseen'>
    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-eye-slash-fill svgIcon" viewBox="0 0 16 16">
      <path fill="#FBFBFB" d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
      <path fill="#FBFBFB" d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
    </svg>
    Unseen
  </Link>
</Container>

    </>
  );
}


export default SidebarFilters;