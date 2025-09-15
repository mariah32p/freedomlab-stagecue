export interface Event {
  id: string;
  name: string;
  date: string;
  total_duration: number; // in minutes
  meeting_link?: string;
  status: 'draft' | 'live' | 'completed';
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface TimeBlock {
  id: string;
  event_id: string;
  title: string;
  start_time: number; // minutes from event start
  duration: number; // in minutes
  type: 'session' | 'break' | 'qa' | 'networking';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Speaker {
  id: string;
  time_block_id: string;
  name: string;
  session_title?: string;
  duration?: number; // in minutes
  email?: string;
  bio?: string;
  order_index: number; // for multiple speakers in one block
  created_at: string;
}

export interface SpeakerNote {
  id: string;
  speaker_id: string;
  time_marker: number; // seconds from block start
  content: string;
  type: 'essential' | 'optional' | 'transition';
  created_at: string;
}

export interface EventSession {
  id: string;
  event_id: string;
  current_block_id?: string;
  start_time?: string;
  status: 'not_started' | 'active' | 'paused' | 'completed';
  created_at: string;
  updated_at: string;
}