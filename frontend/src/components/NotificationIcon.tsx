import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { useUserQuery } from "../api/ApiHooks";
import { User } from "../typescript/interfaces";
import useAuth from "../hooks/useAuth";

const NotificationIcon = () => {
  const { auth } = useAuth();
  
  if (!auth?.user_id) {
    throw new Error("User id is required");
}
  const { data: userData, isLoading, isError } = useUserQuery(auth?.user_id);
  const [user, setUser] = useState<User>({
    user_id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    description: "",
    phone: "",
    address: "",
    image: "",
    messages: ['',''],
    flightids: [],
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const op = useRef<OverlayPanel | null>(null);

  const Notification = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const onPageChange = (event: any) => {
      setCurrentPage(event.first);
    };
    const getPaginatedData = () => {
      const startIndex = currentPage;
      const endIndex = startIndex + 3;

      return user.messages.slice(startIndex, endIndex).map(message => ({
        label: message
      }));

    };
    return (
      <div>
        <DataTable
          value={getPaginatedData()}
          tableStyle={{ minWidth: "20rem" }}
        >
          <Column field="label" />
        </DataTable>
        <Paginator
          first={currentPage}
          rows={3}
          totalRecords={user.messages.length}
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
        {user.messages && <Badge value={user.messages.length}></Badge>}
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
