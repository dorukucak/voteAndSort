const sortProperty = types[type];
    const sorted = bands.sort((a, b) => b[sortProperty] - a[sortProperty]);
    console.log(sorted);
    setData(sorted);

<select onChange={(e) => sortArray(e.target.value)}></select>