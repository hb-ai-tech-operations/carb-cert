export interface GeoPointInput {
  latitude: number;
  longitude: number;
}

export interface AutosuggestNode {
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  id: string;
  location?: {
    formatted: string | null;
  };
  name: string;
}

export interface AddressSearchParams {
  coordinates?: GeoPointInput;
  query: string;
}
