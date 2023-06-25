import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { useUserQuery } from "../api/ApiHooks";
import useAuth from "../hooks/useAuth";
import { User } from "../typescript/interfaces";


const NotificationIcon = () => {
  const { auth } = useAuth();

  if (!auth?.userId) {
    throw new Error("User id is required");
  }

  const { data: userData, isLoading, isError } = useUserQuery(auth?.userId);
  
  const [user, setUser] = useState<User>({
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
    image: "",
    description: "",
    userMessage: [],
    userFlightId: [],
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const op = useRef<OverlayPanel | null>(null);

  const Notification = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 3;

    const onPageChange = (event: any) => {
      setCurrentPage(event.page);
    };

    const getPaginatedData = () => {
      const startIndex = currentPage * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;

      return user.userMessage.slice(startIndex, endIndex).map((messageObj) => ({
        label: messageObj.message,
      }));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred.</div>;

    return (
      <div>
        <DataTable
          value={getPaginatedData()}
          tableStyle={{ minWidth: "20rem" }}
        >
          <Column field="label" />
        </DataTable>
        <Paginator
          first={currentPage * rowsPerPage}
          rows={rowsPerPage}
          totalRecords={user.userMessage.length}
          onPageChange={onPageChange}
          pageLinkSize={3}
        />
      </div>
    );
  };

  return (
    <div>
      <i
        className={`pi pi-bell p-overlay-badge`}
        style={{ fontSize: "2rem" }}
        onClick={(e) => op.current?.toggle(e)}
      >
        {user.userMessage && <Badge value={user.userMessage.length}></Badge>}
      </i>
      <OverlayPanel
        ref={op}
        id={`bell-menu`}
        showCloseIcon={false}
        dismissable={true}
      >
        <Notification />
      </OverlayPanel>
    </div>
  );
};

export default NotificationIcon;
