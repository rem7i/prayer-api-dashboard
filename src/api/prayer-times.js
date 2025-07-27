{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // pages/api/prayer-times.js\
\
import \{ supabase \} from '../../lib/supabaseClient';\
\
export default async function handler(req, res) \{\
  // Get the date from the query parameter, or default to today's date in YYYY-MM-DD format\
  const dateQuery = req.query.date || new Date().toLocaleDateString('en-CA');\
\
  try \{\
    const \{ data, error \} = await supabase\
      .from('prayer_times')\
      .select('imsaku, sabahu, lindja, dreka, ikindia, akshami, jacia, shenime, festat')\
      .eq('date', dateQuery) // Filter by the specific date\
      .single(); // We expect only one row for a given date\
\
    if (error) throw error;\
    if (!data) return res.status(404).json(\{ message: `No prayer times found for date: $\{dateQuery\}` \});\
\
    res.status(200).json(data);\
  \} catch (error) \{\
    res.status(500).json(\{ message: error.message \});\
  \}\
\}}