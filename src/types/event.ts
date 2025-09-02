export interface Event {
  id: string;
  name: string;
  date: string;
  duration: number; // in minutes
  meeting_link?: string;
  status: 'draft' | 'live' | 'completed';
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface Speaker {
  id: string;
  event_id: string;
  name: string;
  session_title: string;
  duration: number; // in minutes
  order_index: number;
  created_at: string;
}

export interface SpeakerNote {
  id: string;
  speaker_id: string;
  time_marker: number; // in seconds from start
  content: string;
  type: 'essential' | 'optional' | 'transition';
  created_at: string;
}

export interface EventSession {
  id: string;
  event_id: string;
  speaker_id: string;
  start_time?: string;
  end_time?: string;
  time_remaining?: number; // in seconds
  status: 'pending' | 'active' | 'completed' | 'extended';
  created_at: string;
}