import './Layout.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}

export default Layout;