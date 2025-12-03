// Day 3: Promises Practice - SOLUTION
// 
// This demonstrates:
// - Creating promises
// - .then() and .catch()
// - Promise chaining
// - Promise.all() and Promise.race()
// - Error handling with promises

console.log('=== Day 3: Promises ===\n');

// Exercise 1: Create a promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise resolved after 2 seconds!');
    }, 2000);
});

console.log('Exercise 1: Creating a Promise');
console.log('Promise created (will resolve in 2 seconds)...');


// Exercise 2: Use .then()
myPromise.then(result => {
    console.log('✓', result);
});


// Exercise 3: Promise that can fail
function mightFail(shouldSucceed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve('Success!');
            } else {
                reject('Something went wrong!');
            }
        }, 1000);
    });
}

console.log('\nExercise 2: Promise Success');
mightFail(true)
    .then(result => console.log('✓', result))
    .catch(error => console.error('✗', error));

console.log('\nExercise 3: Promise Failure');
mightFail(false)
    .then(result => console.log('✓', result))
    .catch(error => console.error('✓ Error caught:', error));


// Exercise 4: Chain promises
function step1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('\nExercise 4: Promise Chaining');
            console.log('Step 1 complete');
            resolve('data from step 1');
        }, 1000);
    });
}

function step2(previousData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Step 2 complete with:', previousData);
            resolve('data from step 2');
        }, 1000);
    });
}

function step3(previousData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Step 3 complete with:', previousData);
            resolve('final result');
        }, 1000);
    });
}

// Chaining (much cleaner than callback hell!)
setTimeout(() => {
    step1()
        .then(result1 => step2(result1))
        .then(result2 => step3(result2))
        .then(finalResult => {
            console.log('✓ All steps done!', finalResult);
        })
        .catch(error => {
            console.error('Error in chain:', error);
        });
}, 3000);


// Exercise 5: Promise.all() - run multiple promises in parallel
console.log('\nExercise 5: Promise.all()');

const promise1 = new Promise((resolve) => {
    setTimeout(() => resolve('First promise'), 1500);
});

const promise2 = new Promise((resolve) => {
    setTimeout(() => resolve('Second promise'), 2000);
});

const promise3 = new Promise((resolve) => {
    setTimeout(() => resolve('Third promise'), 1000);
});

setTimeout(() => {
    console.log('Starting Promise.all() (will take 2 seconds - longest promise)...');
    
    Promise.all([promise1, promise2, promise3])
        .then(results => {
            console.log('✓ All promises resolved:', results);
        })
        .catch(error => {
            console.error('One promise failed:', error);
        });
}, 5000);


// Exercise 6: Promise.race() - first to finish wins
console.log('\nExercise 6: Promise.race()');

const slow = new Promise((resolve) => {
    setTimeout(() => resolve('Slow promise'), 3000);
});

const fast = new Promise((resolve) => {
    setTimeout(() => resolve('Fast promise'), 1000);
});

setTimeout(() => {
    console.log('Starting Promise.race()...');
    
    Promise.race([slow, fast])
        .then(result => {
            console.log('✓ First to finish:', result);
        });
}, 7000);


// BONUS: Real-world example - simulating API calls
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: `User ${userId}` });
            } else {
                reject('Invalid user ID');
            }
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Post 1' },
                { id: 2, title: 'Post 2' }
            ]);
        }, 1000);
    });
}

console.log('\nBONUS: Real-world Promise Chain');
setTimeout(() => {
    console.log('Fetching user and their posts...');
    
    fetchUser(1)
        .then(user => {
            console.log('✓ User fetched:', user);
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log('✓ Posts fetched:', posts);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}, 9000);


console.log('\n✅ Promises demo loaded! Watch the console for async results.');
