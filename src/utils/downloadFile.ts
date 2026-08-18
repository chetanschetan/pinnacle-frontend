import axios from '../api/axios';

export const downloadReport = async (endpoint: string, fileName: string) => {
  try {
    const response = await axios.get(endpoint, {
      responseType: 'blob', // Blob format required for binary files
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download Failed:', error);
    alert('Failed to download report. Please check authorization.');
  }
};