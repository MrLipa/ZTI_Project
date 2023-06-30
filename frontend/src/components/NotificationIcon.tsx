import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { useUserQuery } from "../api/ApiHooks";
import useAuth from "../hooks/useAuth";
import { User } from "../typescript/interfaces";

/**
 * @typedef {Object} NotificationIcon
 * @description This React component represents a notification icon.
 * When clicked, it reveals a menu with a list of user notifications/messages.
 * It retrieves the user's data using the useUserQuery hook.
 * The component also handles pagination of the notifications/messages.
 */
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

  /**
   * @typedef {Object} Notification
   * @description This React component represents the notification menu.
   * It displays a paginated list of user notifications/messages using the DataTable and Paginator components from PrimeReact.
   */
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

export { NotificationIcon };
