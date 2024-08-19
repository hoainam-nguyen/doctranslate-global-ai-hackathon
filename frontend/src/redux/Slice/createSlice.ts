/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type fileObj = {
  fileName: string;
  fileUrlShare: string;
  fileUrlDownload: string;
};

type InitialState = {
  taskIdTranscript: string;
  dataSampleVoice: {}[];
  listTranscript: any[];
  processVideoCreating: number;
  isCreatingVideo: boolean;
  listVideoCreated: fileObj[];
};

const initialState: InitialState = {
  taskIdTranscript: "",
  dataSampleVoice: [],
  listTranscript: [],
  processVideoCreating: 0,
  isCreatingVideo: false,
  listVideoCreated: [],
};

const createNewSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    setTaskIdTranscript: (state, action: PayloadAction<string>) => {
      state.taskIdTranscript = action.payload;
    },
    setDataSampleVoice: (state, action: PayloadAction<any[]>) => {
      state.dataSampleVoice = action.payload;
    },
    addToListTranscript: (state, action: PayloadAction<any>) => {
      const newTranscript = action.payload;
      state.listTranscript = [...state.listTranscript, ...newTranscript];
    },
    updateListTranscript: (state, action: PayloadAction<any[]>) => {
      state.listTranscript = action.payload;
    },
    clearListTranscript: (state) => {
      state.listTranscript = [];
    },
    setProcessVideoCreating: (state, action: PayloadAction<number>) => {
      state.processVideoCreating = action.payload;
    },
    setIsCreatingVideo: (state, action: PayloadAction<boolean>) => {
      state.isCreatingVideo = action.payload;
    },
    addToListVideoCreated: (state, action: PayloadAction<fileObj>) => {
      const newVideo = action.payload;
      state.listVideoCreated.push(newVideo);
    },
    clearListVideoCreated: (state) => {
      state.listVideoCreated = [];
    },
  },
});

export const {
  setTaskIdTranscript,
  setDataSampleVoice,
  addToListTranscript,
  updateListTranscript,
  clearListTranscript,
  setProcessVideoCreating,
  setIsCreatingVideo,
  addToListVideoCreated,
  clearListVideoCreated,
} = createNewSlice.actions;

export default createNewSlice.reducer;
