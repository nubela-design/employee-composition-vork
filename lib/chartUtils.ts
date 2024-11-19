export const processChartData = (data, maxItems = 10) => {
  if (!data || !data.labels || !data.datasets) {
    return null;
  }

  // Create array of objects for easier sorting
  let combinedData = data.labels.map((label, index) => ({
    label,
    value: data.datasets[0].data[index]
  }));

  // Sort by value (descending)
  combinedData.sort((a, b) => b.value - a.value);

  // Calculate total
  const total = combinedData.reduce((sum, item) => sum + item.value, 0);

  // If we have more items than maxItems, group the rest
  if (combinedData.length > maxItems) {
    const topItems = combinedData.slice(0, maxItems - 1);
    const otherItems = combinedData.slice(maxItems - 1);
    
    const othersSum = otherItems.reduce((sum, item) => sum + item.value, 0);
    
    combinedData = [
      ...topItems,
      {
        label: `Others (${otherItems.length} more)`,
        value: othersSum
      }
    ];
  }

  // Add percentage to labels
  const processedData = {
    labels: combinedData.map(item => 
      `${item.label} (${((item.value / total) * 100).toFixed(1)}%)`
    ),
    datasets: [{
      data: combinedData.map(item => item.value)
    }]
  };

  return processedData;
}; 