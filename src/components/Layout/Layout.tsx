import ProtoTypeNavbar from "../navbar/ProtoTypeNavbar";
import SideNavbar from "../navbar/SideNavbar";
import TopNavbar from "../navbar/TopNavbar";

export function Layout({ children }: { children: React.ReactNode }) {
        return (
            <div className="page-container">
                {/* <TopNavbar /> */}
                <ProtoTypeNavbar />
                <div className="page-layout">
                    {/* <SideNavbar /> */}
                    <div className="page-content">{children}</div> {/* This is where the page content will be rendered */}
                </div>
            </div>
        );
    }
  