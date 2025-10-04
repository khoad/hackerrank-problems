import { Ping } from "./ping";
import { Position } from "./position"

/**
 * A named vehicle with a sequence of pings.
 */
export class Vehicle {

  name: string;
  pings: Ping[];

  constructor(name: string) {
    this.name = name;
    this.pings = [];
  }

  /**
   * Gets the name of the vehicle.
   * @return Name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Gets the pings for the vehicle, in chronological order (earliest first).
   * @return Pings
   */
  getPings(): Ping[] {
    return this.pings;
  }

  /**
   * Determines the total distance covered by the pings.
   * @param pings - Array of pings
   * @return Distance covered
   */
  static getTotalDistance(pings: Ping[]): number {
    // Assuming the list is sorted
    // We get the first and last position
    const firstPing = pings[0];
    const lastPing = pings[pings.length - 1];

    // Calculate the distance using the provided function
    const distance = Position.getDistance(firstPing.getPosition(), lastPing.getPosition());
    return distance;
  }

  /**
   * Determines the total distance traveled by the vehicle.
   * @return Total distance traveled
   */
  getTotalDistance(): number {
    return Vehicle.getTotalDistance(this.pings);
  }

  /**
   * Determines the average speed of the vehicle.
   * @return Average speed
   */
  getAverageSpeed(): number {
    if (this.pings.length == 1) {
      // The vehicle has not moved
      // Its speed will be 0
      return 0;
    }

    // Calculate time
    const firstPing = this.pings[0];
    const lastPing = this.pings[this.pings.length - 1];
    const time = lastPing.getTimestamp() - firstPing.getTimestamp();

    // Calculate average speed by dividing distance by time
    // Timestamps are in seconds, so speed will be meters per second
    return this.getTotalDistance() / time;
  }
}
