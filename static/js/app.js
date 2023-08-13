const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {

    // console all data & sample data
    console.log('All Data',data);
    console.log('Sample Data',data.samples[0]);
    

    // defined variables
    let samples_data = data.samples[0];
    let otu_ids = samples_data.otu_ids;
    let sample_values = samples_data.sample_values;
    
    console.log('OTU IDs',otu_ids);
    console.log('Sample Values',sample_values);
    // combine sample values and OTU IDs
    let combined_data = sample_values.map((value, index) => ({
            value: value,
            otu_id: otu_ids[index],
        }));
    let sorted_data = combined_data.sort((a, b) => b.value - a.value);
    console.log('Sorted Data',sorted_data)

    let top_10_sorted_data = sorted_data.slice(0, 10);
    console.log('Top 10 Data',top_10_sorted_data)

    // create Plotly plot
    let plotData = [{
        x: top_10_sorted_data.map(entry => entry.value), // Use the values from sortedData
        y: top_10_sorted_data.map(entry => 'OTU ' + entry.otu_id.toString()), // Use the OTU IDs from sortedData
        type: 'bar',
        orientation: 'h',
    }];

    let layout = {
        title: 'Top 10 OTU IDs vs Sample Values',
        xaxis: {
            title: 'Sample Values'
        },
        yaxis: {
            title: 'OTU IDs'
        }
    };

    Plotly.newPlot("bar", plotData, layout);

});
