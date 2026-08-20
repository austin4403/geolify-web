declare module "open-location-code" {
  export interface CodeArea {
    latitudeLo: number;
    longitudeLo: number;
    latitudeHi: number;
    longitudeHi: number;
    latitudeCenter: number;
    longitudeCenter: number;
    codeLength: number;
  }

  export class OpenLocationCode {
    encode(latitude: number, longitude: number, codeLength?: number): string;
    decode(code: string): CodeArea;
    shorten(code: string, latitude: number, longitude: number): string;
    recoverNearest(shortCode: string, referenceLatitude: number, referenceLongitude: number): string;
    isValid(code: string): boolean;
    isShort(code: string): boolean;
    isFull(code: string): boolean;
  }
}
