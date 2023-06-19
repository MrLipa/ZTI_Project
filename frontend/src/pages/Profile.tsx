import React, { useState, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useUserFlightsHistory, useUserQuery, useCancelReservationMutation, useAddMessageMutation } from "./../api/ApiHooks";
import { Flight, User } from "../typescript/interfaces";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { useToast } from "../context/ToastProvider";

const ProfileCard = () => {
  const { t } = useTranslation('translations');
  const user_id = 1;
  const { data: userData, isLoading, isError } = useUserQuery(user_id);
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
    messages: [],
    flightids: [],
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <Card
      title={user.firstname + " " + user.lastname}
      subTitle={t("Passenger")}
      header={<Avatar image={user.image} size="xlarge" shape="circle" />}
      className="card profile-card"
      style={{
        backgroundColor: "white",
        paddingTop: "30px",
        textAlign: "center",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
        marginBottom: "30px",
      }}
    >
      <p>{user.description}</p>
    </Card>
  );
};

const TravelDetailsCard = () => {
  const { t } = useTranslation('translations');
  const user_id = 1;
  const { data: flights, isLoading, isError } = useUserFlightsHistory(user_id);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [flightData, setFlightData] = useState<Flight[]>([]);
  const cancelReservationMutation = useCancelReservationMutation();
  const addMessageMutation = useAddMessageMutation();

  const removeFlight = (flight: Flight) => {
    cancelReservationMutation.mutate({ user_id: 1, flightId: flight.id });
    addMessageMutation.mutate({ user_id: 1, message: `Reservation cancel to ${flight.destinationCountry} ${flight.destinationCity}` });
  }

  const toTemplate = (flight: Flight) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          src={flight.destinationImage}
          className="profile-image"
          alt={flight.destinationCity}
        />
        <span style={{ marginLeft: "10px" }}>{flight.destinationCity}</span>
      </div>
    );
  };

  const actionTemplate = (flight: Flight) => {
    const flightDate = new Date(flight.date);
    const today = new Date();
  
    flightDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    const isFlightInPast = flightDate.getTime() < today.getTime();
  
    return (
      <Button 
        icon="pi pi-times" 
        severity="danger" 
        onClick={()=>{removeFlight(flight)}}
        disabled={isFlightInPast}
      />
    );
  };
  
  useEffect(() => {
    if (!isLoading && !isError && flights) {
      const flightsWithCustomIds = flights.map((flight, index) => ({...flight, customId: index + 1}));
      setFlightData(flightsWithCustomIds);
    }
  }, [flights, isLoading, isError]);

  const navigate = useNavigate();
  
  return (
    <Card title={t("Travel Details")} className="card travel-details-card">
      <DataTable
        value={flightData}
        selectionMode="single"
        selection={selectedTravel}
        onSelectionChange={(e) => {
          navigate(`/flight/${e.value.id}`);
          setSelectedTravel(e.value);
        }}
        dataKey="customId"
      >
        <Column
          field="destinationCity"
          header={t("Destination")}
          body={toTemplate}
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="price"
          header={t("Price")}
          sortable
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="date"
          header={t("Date")}
          sortable
          style={{ width: "15%" }}
        ></Column>
        <Column
          body={actionTemplate}
          header={t("Action")}
          style={{ width: "1%" }}
      ></Column>
      </DataTable>
    </Card>
  );
};

const UserDetailsCard = () => {
  const { t } = useTranslation('translations');
  const user_id = 1;
  const { data: userData, isLoading, isError } = useUserQuery(user_id);
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
    messages: [],
    flightids: [],
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);


  const userDetails = [
    { label: t("Full Name"), value: user.firstname + " " + user.lastname },
    { label: t("Email"), value: user.email },
    { label: t("Phone"), value: user.phone },
    { label: t("Address"), value: user.address },
  ];

  return (
    <div className="card user-details-card">
      <DataTable value={userDetails} header={null}>
        <Column
          field="label"
          body={(rowData) => (
            <strong className="profile-label">{rowData.label}</strong>
          )}
        ></Column>
        <Column field="value"></Column>
      </DataTable>
    </div>
  );
};

const Profile = () => {
  
  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <div style={{ flexBasis: "30%" }}>
        <ProfileCard />
      </div>
      <div style={{ flexBasis: "70%" }}>
        <UserDetailsCard />
        <TravelDetailsCard />
      </div>
    </div>
  );
};

export default Profile;
