import "@stdlib/deploy";

contract awesome with Deployable {
    counter: Int as uint32;
    record: map<Int, Address>;

    init() {
        self.counter = 0;
    }

    receive("Add") {
        let ctx: Context = context();
        self.record.set(self.counter, ctx.sender);
        self.counter = self.counter + 1;
    }

    receive("Send") {
        let i: Int = 0;
        do {
            let r: Address = self.record.get(i)!!;
            send(SendParameters{
                to: r,
                value: ton("0.0000001"), 
                bounce: false,
                mode: SendIgnoreErrors,
                body: "SENDING".asComment()
            });
            i = i + 1;
        } until (i > self.counter);
    }

    get fun nap(): map<Int, Address> {
        return self.record;
    }

    get fun counter(): Int {
        return self.counter;
    }
}
