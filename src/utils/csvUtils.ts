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
  highBloodPressure: number | string;
  lowBloodPressure: number | string;
  mostCommonComplaint: string;
  highestBloodSugar: number;
  highestUricAcid: number;
  highestBloodPressure: string;
  averageAge: number;
  doorToDoorAttendance: number;
  programDateSta: string;
  programDateEnd: string;
  averageBloodSugar: number;
  averageUricAcid: number;
  averageBloodPressure: string;
}

export interface ArtEventData {
  totalResidents: number;
  attendedEvent: number;
  satisfactionPercent: number;
  eventDate: string;
  duration: number;
  programTitle: string;
}

export interface ArtSubEventData {
  programTitle: string;
  totalResidents: number;
  attendedEvent: number;
  satisfactionPercent: number;
  eventDate: string;
  duration: number;
  programSummary: string;
  eventProdi: string;
  kendala: string;
  solusi: string;
}

export interface HouseNumberingData {
  totalResidents: number;
  totalFamilyHead: number;
  totalHouses: number;
  programDate: string;
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

const parseIntegerValue = (value: string, defaultValue: number = 0): number => {
  const parsed = parseInt(value.trim().replace(/"/g, ''));
  return isNaN(parsed) ? defaultValue : parsed;
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
      highBloodPressure: 'N/A',
      lowBloodPressure: 'N/A',
      mostCommonComplaint: 'N/A',
      highestBloodSugar: NaN,
      highestUricAcid: NaN,
      highestBloodPressure: 'N/A',
      averageAge: NaN,
      doorToDoorAttendance: NaN,
      programDateSta: 'N/A',
      programDateEnd: 'N/A',
      averageBloodSugar: NaN,
      averageUricAcid: NaN,
      averageBloodPressure: 'N/A',
    } as HealthScreeningData;
  }

  const headers = lines[0].split(',').map(header => header.trim());
  const values = lines[1].split(',').map(value => value.trim().replace(/"/g, ''));

  const data: any = {};

  headers.forEach((header, index) => {
    const value = values[index];
    if (header && value !== undefined) {
      if (['totalResidents', 'attended', 'highBloodSugar', 'highUricAcid', 'highestBloodSugar', 'highestUricAcid', 'averageAge', 'doorToDoorAttendance', 'averageBloodSugar', 'averageUricAcid'].includes(header)) {
        data[header] = parseNumericValue(value, true);
      } else if (['highBloodPressure', 'lowBloodPressure'].includes(header)) {
        const parsed = parseNumericValue(value, false);
        if (!isNaN(parsed)) {
            data[header] = parsed;
        } else {
            data[header] = value;
        }
      } else if (['highestBloodPressure', 'averageBloodPressure'].includes(header)) {
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
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSnj5uwLkaApeiYgEpYuofZMBmFQLwXmnCXXMraCYp43Un3TIM9WUHnk82UO7jtWF6phKtKdIPZK9ht/pub?gid=1967206431&single=true&output=csv');
  const csvText = await response.text();

  console.log('Art CSV response:', csvText);

  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    console.error("CSV data for Art Event is empty or missing headers/data.");
    return {
      mainEvent: {
        totalResidents: NaN,
        attendedEvent: NaN,
        satisfactionPercent: NaN,
        eventDate: 'N/A',
        duration: NaN,
        programTitle: 'N/A'
      },
      subEvents: []
    };
  }

  const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
  const allRowsData: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim().replace(/"/g, ''));
    const rowData: any = {};
    headers.forEach((header, index) => {
      const value = values[index];
      if (header && value !== undefined) {
        if (['totalResidents', 'attendedEvent', 'satisfactionPercent', 'duration'].includes(header)) {
          rowData[header] = parseIntegerValue(value);
        } else {
          rowData[header] = value;
        }
      }
    });
    allRowsData.push(rowData);
  }

  const mainEventData = allRowsData[0] || {};
  const subEventData = allRowsData.slice(1);

  const mainEvent: ArtEventData = {
    totalResidents: mainEventData.totalResidents || 0,
    attendedEvent: mainEventData.attendedEvent || 0,
    satisfactionPercent: mainEventData.satisfactionPercent || 0,
    eventDate: mainEventData.eventDate || '',
    duration: mainEventData.duration || 0,
    programTitle: mainEventData.programTitle || 'Art Creation & Exhibition'
  };

  const subEvents: ArtSubEventData[] = subEventData.map(data => ({
    programTitle: data.programTitle || 'N/A',
    totalResidents: data.totalResidents || 0,
    attendedEvent: data.attendedEvent || 0,
    satisfactionPercent: data.satisfactionPercent || 0,
    eventDate: data.eventDate || '',
    duration: data.duration || 0,
    programSummary: data.programSummary || 'No summary available',
    eventProdi: data.eventProdi || 'No summary available',
    kendala: data.kendala || 'Tidak ada kendala',
    solusi: data.solusi || 'Tidak ada solusi'
  }));

  console.log('Parsed main event data:', mainEvent);
  console.log('Parsed sub events data:', subEvents);

  return { mainEvent, subEvents };
};

export const fetchHouseNumberingData = async (): Promise<HouseNumberingData> => {
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSnj5uwLkaApeiYgEpYuofZMBmFQLwXmnCXXMraCYp43Un3TIM9WUHnk82UO7jtWF6phKtKdIPZK9ht/pub?gid=266499628&single=true&output=csv');
  const csvText = await response.text();

  console.log('House Numbering CSV response:', csvText);

  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    console.error("CSV data for HouseNumbering is empty or missing headers/data.");
    return {
      totalResidents: NaN,
      totalFamilyHead: NaN,
      totalHouses: NaN,
      programDate: 'N/A',
    } as HouseNumberingData;
  }

  const headers = lines[0].split(',').map(header => header.trim());
  const values = lines[1].split(',').map(value => value.trim().replace(/"/g, ''));

  const data: any = {};

  headers.forEach((header, index) => {
    const value = values[index];
    if (header && value !== undefined) {
      if (['totalResidents', 'totalFamilyHead', 'totalHouses'].includes(header)) {
        data[header] = parseIntegerValue(value);
      } else {
        data[header] = value;
      }
    }
  });

  console.log('Parsed house numbering data:', data);
  return data as HouseNumberingData;
};
