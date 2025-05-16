const HeaderComponent = () => {
    return (
        <header>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
            />
            <nav className="custom-navbar navbar navbar-expand-md shadow-sm py-3">
                <div className="container-fluid justify-content-center">
                    <span className="navbar-brand mb-0 h1 text-white text-center fw-bold header-title">
                        <i className="bi bi-people-fill me-2"></i>
                        Employee Data Management
                    </span>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
