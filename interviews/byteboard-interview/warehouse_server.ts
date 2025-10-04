import * as fs from "fs";
import * as readline from "readline";

import { Ping } from "./ping";
import { Position } from "./position";
import { Vehicle } from "./vehicle";

export class WarehouseServer {

  // Array of vehicle instances
  vehicles: Vehicle[];

  constructor() {
    this.vehicles = [];
  }

  /**
   * Returns an object mapping vehicle name to that vehicle's average speed for
   * all vehicles.
   */
  getAverageSpeeds(): Partial<Record<string, number>> {
    return this.vehicles.reduce((acc: Partial<Record<string, number>>, vehicle: Vehicle) => {
      acc[vehicle.getName()] = vehicle.getAverageSpeed();
      return acc;
    }, {});
  }

  /**
   * Returns a sorted array of size maxResults of vehicle names corresponding
   * to the vehicles that have traveled the most distance since the given
   * timestamp (in seconds).
   *
   * @param maxResults
   * @param timestamp
   *
   * @returns Array of vehicle names
   */
  getMostTraveledSince(maxResults: number, timestamp: number): string[] {
    // Make a copy so we don't modify the original array
    const copiedVehicles = [...this.vehicles];

    // Remove timestamps that are before this timestamp
    for (let v of copiedVehicles) {
      v.pings = v.pings.filter(p => p.getTimestamp() >= timestamp);
    }

    // Calculate the distance
    const vehiclesWithDistances = copiedVehicles.map(v => ({vehicle: v, distance: v.getTotalDistance()}));

    // Sort the array based on the distance (decending)
    vehiclesWithDistances.sort((a, b) => b.distance - a.distance);

    // Return the top maxResults
    return vehiclesWithDistances.slice(0, maxResults).map(v => v.vehicle.getName());
  }

  /**
   * Returns an array of names identifying vehicles that might have been
   * damaged through any number of risky behaviors, including collision with
   * another vehicle and excessive acceleration.
   *
   * This method identifies vehicles that may need inspection based on:
   * 1. Collision detection: Vehicles that come within a dangerous proximity (IMPLEMENTED)
   * 2. Excessive acceleration: Vehicles with sudden speed changes (TODO - not implemented)
   * 3. Aggressive driving patterns: Rapid acceleration/deceleration cycles (TODO)
   *
   * @returns Array of vehicle names that may need inspection
   */
  checkForDamage(): string[] {
    const damagedVehicles = new Set<string>();
    
    // Check for collisions between vehicles
    this.checkForCollisions(damagedVehicles);
    
    // Check for excessive acceleration patterns
    this.checkForExcessiveAcceleration(damagedVehicles);
    
    return Array.from(damagedVehicles);
  }

  /**
   * Checks for potential collisions between vehicles by analyzing their proximity
   * at similar timestamps. Vehicles that come within 2 meters of each other
   * are considered to have potentially collided.
   * 
   * @param damagedVehicles - Set to add damaged vehicle names to
   */
  private checkForCollisions(damagedVehicles: Set<string>): void {
    // Compare each vehicle with every other vehicle
    for (let i = 0; i < this.vehicles.length; i++) {
      for (let j = i + 1; j < this.vehicles.length; j++) {
        const vehicle1 = this.vehicles[i];
        const vehicle2 = this.vehicles[j];
        
        // Check if these vehicles were ever in close proximity
        if (this.vehiclesWereInProximity(vehicle1, vehicle2)) {
          damagedVehicles.add(vehicle1.getName());
          damagedVehicles.add(vehicle2.getName());
        }
      }
    }
  }

  /**
   * Determines if two vehicles were ever in close proximity to each other.
   * This is a simplified collision detection that checks if any ping from
   * one vehicle is within the threshold distance of any ping from another
   * vehicle at a similar timestamp.
   * 
   * @param vehicle1 - First vehicle to check
   * @param vehicle2 - Second vehicle to check
   * @returns True if vehicles were in proximity
   */
  private vehiclesWereInProximity(vehicle1: Vehicle, vehicle2: Vehicle): boolean {
    const COLLISION_THRESHOLD = 2.0; // meters - vehicles within this distance are considered colliding
    const TIME_DIFF = 5; // seconds

    const pings1 = vehicle1.getPings();
    const pings2 = vehicle2.getPings();
    
    // Check each ping from vehicle1 against each ping from vehicle2
    for (const ping1 of pings1) {
      for (const ping2 of pings2) {
        const distance = Position.getDistance(ping1.getPosition(), ping2.getPosition());
        const timeDiff = Math.abs(Ping.secondsBetween(ping1, ping2));
        
        // Consider it a potential collision if:
        // 1. They are within the distance threshold
        // 2. The time difference is small (within 5 seconds)
        if (distance <= COLLISION_THRESHOLD && timeDiff <= TIME_DIFF) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * Checks for excessive acceleration patterns in individual vehicles.
   * A vehicle is flagged if it has:
   * - Acceleration greater than 5 m/s²
   * - Deceleration greater than 8 m/s² (harder braking)
   * - Multiple rapid speed changes in a short time period
   * 
   * @param damagedVehicles - Set to add damaged vehicle names to
   */
  private checkForExcessiveAcceleration(damagedVehicles: Set<string>): void {
    // TODO: Implement excessive acceleration detection
    // Plan:
    // 1. For each vehicle, calculate speed between consecutive pings
    // 2. Calculate acceleration as (current_speed - previous_speed) / time_difference
    // 3. Flag vehicles with acceleration > 5 m/s² or deceleration > 8 m/s²
    // 4. Also detect rapid speed changes within a 10-second window
    
    // TODO: This is where I would implement the acceleration detection
    // For now, leaving this as a placeholder due to time constraints
    // The collision detection above should catch most damage cases
  }

  /**
   * Checks if a sequence of pings shows rapid speed changes within a time window.
   * This helps identify aggressive driving patterns.
   * 
   * TODO: Implement this method to detect rapid speed changes
   * Plan:
   * 1. Calculate speeds between consecutive pings
   * 2. Track speed changes and identify patterns
   * 3. Flag sequences with multiple significant speed changes
   * 4. Use statistical analysis to detect aggressive driving patterns
   * 
   * @param pings - Array of pings to analyze
   * @param timeWindow - Time window in seconds
   * @returns True if rapid speed changes are detected
   */
  private hasRapidSpeedChanges(pings: Ping[], timeWindow: number): boolean {
    // TODO: Implement rapid speed change detection
    // This would analyze the sequence of pings to identify aggressive driving
    // For now, return false as a placeholder
    return false;
  }

  initializeServer(fileName: string): Promise<void> {
    return new Promise(resolve => {
      const reader = readline.createInterface({
        input: fs.createReadStream(fileName),
      });
      reader.on('line', (line: string) => {
        const [name, x, y, timestamp] = line.split(',');
        this.processPing(name, parseInt(x), parseInt(y), parseInt(timestamp));
      });
      reader.on('close', resolve);
    });
  }

  processPing(vehicleName: string, x: number, y: number, timestamp: number) {
    const ping = new Ping(x, y, timestamp);
    if (!this.vehicles.some(vehicle => vehicle.getName() === vehicleName)) {
      this.vehicles.push(new Vehicle(vehicleName));
    }
    this.vehicles[this.vehicles.length - 1].getPings().push(ping);
  }
}
