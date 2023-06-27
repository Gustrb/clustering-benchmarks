const { exec } = require('child_process');

const fetchServer = () => fetch('http://localhost:8000/');

const benchmark = async () => {
    const t0 = performance.now()

    const promises = [];
    for (let i = 0; i < 10000; ++i) {
        promises.push(fetchServer());
    }

    await Promise.all(promises);

    const t1 = performance.now()
    console.log(`Time it takes to run the function: ${t1 - t0} ms`)
};

const main = async () => {
    const pr = exec('npm run start-without-clustering');
    await benchmark();

    pr.kill();

    const pr2 = exec('npm run start-with-clustering');
    await benchmark();

    pr2.kill();
};

main();
