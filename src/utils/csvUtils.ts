// csvUtils.ts

export interface MovieScreeningData {
  totalResidents: number;
  attendedEvent: number;
  satisfactionPercent: number;
  movieTitle: string;
  screeningDate: string;
  duration: number;
}

export interface HealthScreeningData {
  totalResidents: number;
  attended: number;
  highBloodSugar: number;
  highUricAcid: number;
  highBloodPressure: number;
  lowBloodPressure: number;
  mostCommonComplaint: string;
  highestBloodSugar: number;
  highestUricAcid: number;
  highestBloodPressure: string;
  averageAge: number;
  doorToDoorAttendance: number;
  programDateSta: string;
  programDateEnd: string;
}

export interface ArtEventData {
  totalResidents: number;
  attendedEvent: number;
  satisfactionPercent: number;
  eventDate: string;
  duration: number;
  programTitle: string;
  successfulParticipation: number;
  salesRevenue: number;
  productsSold: number;
}

export interface ArtSubEventData {
  programTitle: string;
  totalResidents: number;
  attendedEvent: number;
  satisfactionPercent: number;
  eventDate: string;
  duration: number;
  successfulParticipation: number;
  successRate: number;
}

const parseNumericValue = (value: string, isInt: boolean = true): number => {
  const cleanedValue = value.trim().replace(/"/g, '');
  let parsedValue: number;

  if (isInt) {
    parsedValue = parseInt(cleanedValue, 10);
  } else {
    parsedValue = parseFloat(cleanedValue);
  }

  return isNaN(parsedValue) ? NaN : parsedValue;
};

export const fetchMovieScreeningData = async (): Promise<MovieScreeningData> => {
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSnj5uwLkaApeiYgEpYuofZMBmFQLwXmnCXXMraCYp43Un3TIM9WUHnk82UO7jtWF6phKtKdIPZK9ht/pub?gid=650739554&single=true&output=csv');
  const csvText = await response.text();

  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    console.error("CSV data for MovieScreening is empty or missing headers/data.");
    return {
      totalResidents: NaN,
      attendedEvent: NaN,
      satisfactionPercent: NaN,
      movieTitle: 'N/A',
      screeningDate: 'N/A',
      duration: NaN,
    } as MovieScreeningData;
  }

  const headers = lines[0].split(',').map(header => header.trim());
  const values = lines[1].split(',').map(value => value.trim().replace(/"/g, ''));

  const data: any = {};

  headers.forEach((header, index) => {
    const value = values[index];
    if (header && value !== undefined) {
      if (['totalResidents', 'attendedEvent', 'satisfactionPercent', 'duration'].includes(header)) {
        data[header] = parseNumericValue(value, true);
      } else {
        data[header] = value;
      }
    }
  });

  console.log('Movie Data Parsed:', data);
  return data as MovieScreeningData;
};

export const fetchHealthScreeningData = async (): Promise<HealthScreeningData> => {
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSnj5uwLkaApeiYgEpYuofZMBmFQLwXmnCXXMraCYp43Un3TIM9WUHnk82UO7jtWF6phKtKdIPZK9ht/pub?gid=1461609518&single=true&output=csv');
  const csvText = await response.text();

  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    console.error("CSV data for HealthScreening is empty or missing headers/data.");
    return {
      totalResidents: NaN,
      attended: NaN,
      highBloodSugar: NaN,
      highUricAcid: NaN,
      highBloodPressure: NaN,
      lowBloodPressure: NaN,
      mostCommonComplaint: 'N/A',
      highestBloodSugar: NaN,
      highestUricAcid: NaN,
      highestBloodPressure: 'N/A',
      averageAge: NaN,
      doorToDoorAttendance: NaN,
      programDateSta: 'N/A',
      programDateEnd: 'N/A',
    } as HealthScreeningData;
  }

  const headers = lines[0].split(',').map(header => header.trim());
  const values = lines[1].split(',').map(value => value.trim().replace(/"/g, ''));

  const data: any = {};

  headers.forEach((header, index) => {
    const value = values[index];
    if (header && value !== undefined) {
      if (['totalResidents', 'attended', 'highBloodSugar', 'highUricAcid', 'highestBloodSugar', 'highestUricAcid', 'averageAge', 'doorToDoorAttendance'].includes(header)) {
        data[header] = parseNumericValue(value, true);
      } else if (['highBloodPressure', 'lowBloodPressure'].includes(header)) {
        const parsed = parseNumericValue(value, false);
        if (!isNaN(parsed)) {
            data[header] = parsed;
        } else {
            data[header] = value;
        }
      } else if (header === 'highestBloodPressure') {
        data[header] = value;
      } else {
        data[header] = value;
      }
    }
  });

  console.log('Health Data Parsed:', data);
  return data as HealthScreeningData;
};


export const fetchArtEventData = async (): Promise<{
  mainEvent: ArtEventData;
  subEvents: ArtSubEventData[];
}> => {
  const mainEvent: ArtEventData = {
    totalResidents: 150,
    attendedEvent: 120,
    satisfactionPercent: 92,
    eventDate: "2024-06-15",
    duration: 240,
    programTitle: "Community Art Creation & Exhibition",
    successfulParticipation: 110,
    salesRevenue: 2500,
    productsSold: 45
  };

  const subEvents: ArtSubEventData[] = [
    {
      programTitle: "Painting Workshop",
      totalResidents: 150,
      attendedEvent: 35,
      satisfactionPercent: 95,
      eventDate: "2024-06-15",
      duration: 60,
      successfulParticipation: 32,
      successRate: 91
    },
    {
      programTitle: "Sculpture Creation",
      totalResidents: 150,
      attendedEvent: 28,
      satisfactionPercent: 88,
      eventDate: "2024-06-15",
      duration: 90,
      successfulParticipation: 24,
      successRate: 86
    },
    {
      programTitle: "Pottery Making",
      totalResidents: 150,
      attendedEvent: 32,
      satisfactionPercent: 90,
      eventDate: "2024-06-15",
      duration: 75,
      successfulParticipation: 29,
      successRate: 91
    },
    {
      programTitle: "Art Exhibition & Sales",
      totalResidents: 150,
      attendedEvent: 85,
      satisfactionPercent: 94,
      eventDate: "2024-06-15",
      duration: 180,
      successfulParticipation: 45,
      successRate: 53
    }
  ];

  return { mainEvent, subEvents };
};