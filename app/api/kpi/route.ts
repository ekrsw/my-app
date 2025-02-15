import { NextResponse } from 'next/server';

export async function GET() {
  const host = "letsw8-0408";
  const api_key = "p22ehtbS.T4G1f9urNz84QaeID8IV7iNPlTNLCD15";
  const headers = {
    'x-api-key': api_key,
    'Accept': 'application/json'
  };

  try {
    const url = `http://${host}/api/kpi/`;
    console.log('Fetching KPI data from:', url);
    
    const fetchOptions: RequestInit = {
      headers: headers,
      cache: 'no-store' as RequestCache,
      mode: 'cors' as RequestMode
    };
    console.log('Fetch options:', fetchOptions);

    const response = await fetch(url, fetchOptions);
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorDetails = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      };
      console.error('API response error:', errorDetails);
      throw new Error(JSON.stringify(errorDetails, null, 2));
    }

    const data = await response.json();
    console.log('API response data:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
