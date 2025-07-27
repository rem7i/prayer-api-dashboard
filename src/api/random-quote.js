{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // pages/api/random-quote.js\
\
import \{ supabase \} from '../../lib/supabaseClient';\
\
export default async function handler(req, res) \{\
  try \{\
    // Call the database function we created\
    const \{ data, error \} = await supabase.rpc('get_random_quote').single();\
\
    if (error) throw error;\
    if (!data) return res.status(404).json(\{ message: 'No quotes found.' \});\
\
    // The function returns a full row, we only need text and source\
    res.status(200).json(\{ text: data.text, source: data.source \});\
  \} catch (error) \{\
    res.status(500).json(\{ message: error.message \});\
  \}\
\}}