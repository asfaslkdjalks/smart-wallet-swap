import AccountConnect from "../../components/header/AccountConnect";

function NotConnected() {
  return (
    <div className="flex flex-col items-center justify-center gap-8" style={{height: '60vh'}}>
      <span className="text-xl">Please connect your wallet to continue.</span>
      <div><AccountConnect /></div>
    </div>
  );
}

export default NotConnected;

