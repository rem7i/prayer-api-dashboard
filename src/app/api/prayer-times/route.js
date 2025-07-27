{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // app/api/prayer-times/route.js\
\
import \{ NextResponse \} from 'next/server';\
import \{ supabase \} from '../../../lib/supabaseClient'; // Adjust path if needed\
\
export async function GET(request) \{\
  // Get search params from the request URL\
  const \{ searchParams \} = new URL(request.url);\
  const dateQuery = searchParams.get('date') || new Date().toLocaleDateString('en-CA');\
\
  try \{\
    const \{ data, error \} = await supabase\
      .from('prayer_times')\
      .select('imsaku, sabahu, lindja, dreka, ikindia, akshami, jacia, shenime, festat')\
      .eq('date', dateQuery)\
      .single();\
\
    if (error) throw error;\
    if (!data) \{\
        return NextResponse.json(\
            \{ message: `No prayer times found for date: $\{dateQuery\}` \}, \
            \{ status: 404 \}\
        );\
    \}\
\
    return NextResponse.json(data);\
  \} catch (error) \{\
    return NextResponse.json(\{ message: error.message \}, \{ status: 500 \});\
  \}\
\}}