const carMakers = ['ford', 'toyota', 'chevy'];

const carsByMake: string[][] = [];

// Help with inference  when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
carMakers.push(100);

// Hep with 'map'
carMakers.map(
  (car: string): string => {
    return car.toUpperCase();
  }
);

// Flexible types
const importantDates: (string | Date)[] = [new Date(), '2030-10-10'];
importantDates.push('2000-10-23');
importantDates.push(100);
