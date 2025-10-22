import { start } from "node:repl";

class IdGenerator {
    constructor(shardsConfig) {
        /**
            shardsConfig = [
                {shardId : 1, start : 1, end : 200_000_000},
                {shardId : 2, start : 200_000_001, end : 400_000_000},
                ...
            ]
        **/
       this.shards = new Map();
       for(const shard of shardsConfig){
        this.shards.set(shard.shardId, {
            start : shard.start,
            end : shard.end,
            nextSeq : 0
        });
       }
    }

    generateId(shardId) {
        const shard = this.shards.get(shardId);
        if(!shard)
            throw new Error(`Shard ${shardId} not found`);
        if(shard.nextSeq + shard.start > shard.end){
            throw new Error(`Shard ${shardId} exhausted`);
        }
        const id = shard.start + shard.nextSeq;
        shard.nextSeq++;
        return id;
    }

    addShard(shardId, start, end){
        if(this.shards.has(shardId))
            throw new Error('Shard already existed');
        this.shards.set(shardId, {start, end, nextSeq : 0});
    }

    getShardInfo(shardId){
        return this.shards.get(shardId);
    }

    listShards(){
        return Array.from(this.shards.keys());
    }
}

// -----------------------------------------------------------
const shardsConfig = [
    {shardId : 1, start : 0, end : 200_000_000},
    {shardId : 2, start : 200_000_001, end : 400_000_000},
    {shardId : 3, start : 400_000_001, end : 600_000_000}
];

const idGen = new IdGenerator(shardsConfig);

console.log("Shard Ids : ", idGen.listShards());

// Generate some ids from shard 2
for(let i = 0; i < 10; i++){
    console.log("new ID from shard 2 : ", idGen.generateId(2));
}

// Add new shard easily 
idGen.addShard(4, 600_000_001, 800_000_000)
