const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {

    // console all data & sample data
    console.log('All Data',data);
    console.log('Sample Data',data.samples[0]);

    // defined variables
    let samples_data = data.samples[0]
    let out_ids = samples_data.otu_ids
    let sample_values = samples_data.sample_values
    // find first 10 sample values and otu ids
    let top_10_sample_values = sample_values.slice(0, 10)
    let top_10_otu_ids = out_ids.slice(0, 10).map(id => 'OTU ' + id.toString());

    // conasole the first 10
    console.log('Top 10 OTU IDs',top_10_otu_ids)
    console.log('Top 10 Sample Values',top_10_sample_values)

    // Sort the data in ascending order
    let sortedIndices = top_10_sample_values
    .map((_, index) => index)
    .sort((a, b) => top_10_sample_values[a] - top_10_sample_values[b]);

    let sortedSampleValues = sortedIndices.map(index => top_10_sample_values[index]);
    let sortedOTUIds = sortedIndices.map(index => top_10_otu_ids[index]);

    // create Plotly plot
    let plotData = [{
        x: sortedSampleValues,
        y: sortedOTUIds,
        type: 'bar',
        orientation: 'h'
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
