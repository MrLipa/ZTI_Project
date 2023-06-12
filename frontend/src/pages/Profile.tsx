import React, { useState, useEffect }from 'react';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useFlightQuery} from './../api/ApiHooks';
interface Flight {
    id: number;
    originCountry: string;
    originCity: string;
    destinationCountry: string;
    destinationCity: string;
    image: string;
    price: number;
    date: string;
    duration: string;
    airline: string;
    class: string;
    freeSeats: number;
  }
export const Profile1 = () => {
    const header = <Avatar image="https://randomuser.me/api/portraits/men/75.jpg" size="xlarge" shape="circle" />;

    return (
        <Card 
            title="Jan Kowalski"
            subTitle="Pasażer"
            header={header}
            style={{backgroundColor: 'white', paddingTop: '30px', textAlign: 'center', boxShadow: '0px 3px 6px rgba(0,0,0,0.16)', marginBottom: '30px'}}
        >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non semper leo, vitae interdum est. In consequat massa in risus semper, in volutpat libero egestas. Sed in facilisis ante, nec ornare enim. Suspendisse malesuada dolor non consectetur mollis.</p>
        </Card>
    );
}
const TravelCard = () => {
    const { data: flights, isLoading, isError } = useFlightQuery();
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [flightData, setFlightData] = useState<Flight[]>([]);

    const toTemplate = (flight: Flight) => {
      return (
        <div className="flex align-items-center gap-2">
            <img 
                src={flight.image} 
                style={{ 
                    width: '60px', 
                    height: '50px', 
                    borderRadius: '50%', // this makes the image round 
                }} 
            />
            <span style={{ marginLeft: '10px' }}>{flight.destinationCity}</span>
        </div>
      );
    };

    useEffect(() => {
    if (!isLoading && !isError && flights) {
        setFlightData(flights);
    }
    }, [flights, isLoading, isError]);

    return (
        <Card 
            title="Travel Details"
            style={{
                backgroundColor: 'white',
                paddingTop: '30px',
                textAlign: 'center',
                boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
                marginBottom: '30px'
            }}
        >
            <DataTable 
                value={flightData} 
                selectionMode="single" 
                selection={selectedTravel} 
                onSelectionChange={(e) => setSelectedTravel(e.value)} 
                dataKey="id"
            >
                <Column field="destinationCity" header="Destination" body={toTemplate} sortable style={{ width: '20%' }}></Column>
                <Column field="price" header="Price" sortable style={{ width: '20%' }}></Column>
                <Column field="date" header="Date" sortable style={{ width: '20%' }}></Column>
            </DataTable>
        </Card>
    );
}
const UserDetailsCard = () => {
    const userDetails = [
        { label: 'Full Name', value: 'Jan Kowalski' },
        { label: 'Email', value: 'jan.kowalski@example.com' },
        { label: 'Phone', value: '+48 123 456 789' },
        { label: 'Address', value: 'ul. Przykładowa 1, 00-000 Miasto' },
    ];

    return (
        <div 
            className="card"
            style={{
                backgroundColor: 'white',
                padding: '30px',
                paddingBottom: '30px',
                textAlign: 'center',
                boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
                marginBottom: '30px'
            }}
        >
            <DataTable value={userDetails} header={null}>
                <Column field="label" body={(rowData) => <strong>{rowData.label}</strong>}></Column>
                <Column field="value" ></Column>
            </DataTable>
        </div>
    );
}
export const Profile = () => {
    return (
        <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ flexBasis: '30%'}}>
                <Profile1 />
            </div>
            <div style={{ flexBasis: '70%' }}>
                <UserDetailsCard />
                <TravelCard />
            </div>
        </div>
    );
}

export default Profile;
