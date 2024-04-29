import { NextApiRequest, NextApiResponse } from 'next';

import axios from '../../utils/axios';
import { Media, MediaType } from '../../types';
import { parse } from '../../utils/apiResolvers';

interface Response {
  type: 'Success' | 'Error';
  data: Media[] | Error;
}

const apiKey = process.env.TMDB_KEY;

export default async function handler(request: NextApiRequest, response: NextApiResponse<Response>) {
  const { type } = request.query;

  try {
    const result = await axios().get(`/${type}/popular`, {
      params: {
        api_key: apiKey,
        watch_region: 'US',
        language: 'en-US'
      }
    });
    const data = parse(result.data.results, type as MediaType);

    response.status(200).json({ type: 'Success', data });
  } catch (error: any) {
    console.log(`here is your error : ${error}`);

    response.status(500).json({ type: 'Error', data: error.data });
  }
}
