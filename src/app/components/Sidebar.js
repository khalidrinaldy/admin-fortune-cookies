import React, { useState } from "react";
import { Dropdown, Nav, Navbar, Sidebar, Sidenav } from "rsuite";
import NavItem from "rsuite/esm/Nav/NavItem";
import SidenavBody from "rsuite/esm/Sidenav/SidenavBody";
import DashboardIcon from '@rsuite/icons/Dashboard';
import TableIcon from '@rsuite/icons/Table';
import PeoplesIcon from '@rsuite/icons/Peoples';
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import ExitIcon from '@rsuite/icons/Exit';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import SiteIcon from '@rsuite/icons/Site';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { CategoryAtom } from '../data/provider/Atom';

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};

export const MySidebar = () => {
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/auth');
        window.location.reload()
    }

    return (
        <Sidebar
            style={{ display: 'flex', flexDirection: 'column', height: "100%" }}
            width={expanded ? 260 : 56}
            collapsible
        >
            <Sidenav
                style={{ height: "100%" }}
                expanded={expanded}
                activeKey={activeKey}
                onSelect={setActiveKey}
            >
                <Sidenav.Header>
                    <div style={headerStyles}>
                        <SiteIcon style={{ marginLeft: 2 }} />
                        <span style={{ marginLeft: 15, fontWeight: "bold", color: "black" }}> Fortune Cookies</span>
                    </div>
                </Sidenav.Header>
                <SidenavBody>
                    <Nav>
                        <NavItem eventKey="1" icon={<DashboardIcon />} onClick={() => navigate("/")} >
                            Dashboard
                        </NavItem>
                        <Dropdown placement="rightStart" eventKey="2" title="Products" icon={<TableIcon />}>
                            <DropdownItem eventKey="2-1" onClick={() => navigate("/product/add")} >Add New Product</DropdownItem>
                            <DropdownItem eventKey="2-1" onClick={() => navigate("/product/cookies")} >Cookies</DropdownItem>
                            <DropdownItem eventKey="2-2" onClick={() => navigate("/product/cake")}>Cake</DropdownItem>
                            <DropdownItem eventKey="2-3" onClick={() => navigate("/product/bread")}>Bread</DropdownItem>
                            <DropdownItem eventKey="2-4" onClick={() => navigate("/product/chocolates")}>Chocolates</DropdownItem>
                        </Dropdown>
                        <NavItem eventKey="4" icon={<ExitIcon />} onClick={handleLogout}>
                            Log Out
                        </NavItem>
                    </Nav>
                </SidenavBody>
            </Sidenav>
            <Navbar appearance="subtle" className="nav-toggle"
                style={{ backgroundColor: "#f7f7fa" }}>
                <Nav pullRight>
                    <Nav.Item onClick={() => setExpanded(!expanded)} style={{ width: 56, textAlign: 'center' }}>
                        {expanded ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
                    </Nav.Item>
                </Nav>
            </Navbar>
        </Sidebar>
    )
}