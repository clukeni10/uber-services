import { Box } from "@chakra-ui/react";
import Header from "../components/header";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Services from "../components/services";
import TopProfessionals from "../components/top_professionals";
import ForProfessionals from "../components/for_professionals";



export default function SPA(){
      return( 
            <Box> 
                  <Header/>
                  <Hero/>
                  <Services />
                  <TopProfessionals />
                  <ForProfessionals />
                  <Footer/>
            </Box>
      )
}