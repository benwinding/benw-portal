import { Header } from "components/Header";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export function DefaultLayout(props: { children: React.ReactNode }) {
  return <div className="h-screen w-screen" style={{ overflowY: 'overlay' as any, paddingRight: '10px' }} >
    <section className="container mx-auto p-2">
      <Header />
      <TransitionGroup>
          <CSSTransition
            timeout={300}
            classNames="item"
          >
            <>{props.children}</>
          </CSSTransition>
      </TransitionGroup>
    </section>
  </div>
}
