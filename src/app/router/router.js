import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate, Outlet } from "react-router";
import { ApiService } from "../modules/services/apiService";
import { auth, AuthView } from "../modules/view/authentication/auth";
import { Dashboard } from "../modules/view/home/dashboard";
import { BreadView } from "../modules/view/products/bread";
import { CakeView } from "../modules/view/products/cake";
import { ChocolatesView } from "../modules/view/products/chocolates";
import { CookiesView } from "../modules/view/products/cookies";
import { NewProductView } from "../modules/view/products/new product";

export const Router = () => {
    const apiService = new ApiService();
    const navigate = useNavigate();

    function ProtectedRoute() {
        const data = JSON.parse(localStorage.getItem('user'))
        return (
            data != null ? <Outlet /> : <Navigate to="/auth" />
        );
    }

    return (
        <Routes>
            <Route exact path="/" element={<ProtectedRoute />}>
                <Route exact path="/" element={<Dashboard />} />
            </Route>
            <Route path="/auth" element={<AuthView />}></Route>
            <Route path="/product/cookies" element={<ProtectedRoute />}>
                <Route path="/product/cookies" element={<CookiesView />} />
            </Route>
            <Route path="/product/chocolates" element={<ProtectedRoute />}>
                <Route path="/product/chocolates" element={<ChocolatesView />} />
            </Route>
            <Route path="/product/bread" element={<ProtectedRoute />}>
                <Route path="/product/bread" element={<BreadView />} />
            </Route>
            <Route path="/product/cake" element={<ProtectedRoute />}>
                <Route path="/product/cake" element={<CakeView />} />
            </Route>
            <Route path="/product/add" element={<ProtectedRoute />}>
                <Route path="/product/add" element={<NewProductView />} />
            </Route>
        </Routes>
    )
}