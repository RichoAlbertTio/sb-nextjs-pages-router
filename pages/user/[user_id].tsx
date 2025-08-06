import { useRouter } from "next/router";
export default function User() {
      const router = useRouter();
      console.log("router", router);
      // router.query.user_id akan berisi nilai dari [user_id] yang ada di URL
      // Misalnya jika URL adalah /user/123, maka router.query.user_id akan berisi "123"
      return <div>User: {router.query.user_id}</div>
}
