export interface Location {
  ip: string;
  date: Date;
  currentLocation: {
    city: string;
    country: string;
    geonameId: number;
    lat: number;
    lng: number;
    postalCode: string;
    region: string;
    timezone: string;
    currency:{
      code:string;
      name:string;
      symbol:string;
    };
    flag:string;

  }

}
