import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Card, Container, Form, Row, Col } from 'react-bootstrap';

export default () => {
  // Initial himpunan
  const initHimpunan = {
    semesta: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    himpunanA: [],
    himpunanB: [],
  };
  const [himpunan, setHimpunan] = useState(initHimpunan);

  // Initial formatted semesta for A and B komplemens
  const semestaLength = himpunan.semesta.length;
  const formattedSemesta = himpunan.semesta.map((item, i) => (
    <Fragment key={i}>
      <span style={{ color: 'black' }}>{item}</span>
      {semestaLength !== i + 1 ? ', ' : ''}
    </Fragment>
  ));

  // Initial formatted
  const initFormatted = {
    himpunanA: [],
    himpunanB: [],
    semestaKomplemenA: formattedSemesta,
    komplemenA: [],
    semestaKomplemenB: formattedSemesta,
    komplemenB: [],
    A_B: [],
    A_BhimpunanA: [],
    B_A: [],
    B_AhimpunanB: [],
  };
  const [formatted, setFormatted] = useState(initFormatted);

  // Get himpunan and anggota from user input
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Create an object to store new values of himpunan A and B
    const newData = {
      ...himpunan,
      [name]: [...value].map(Number),
    };

    setHimpunan(newData);

    // Formatted himpunan A
    const himpunanALength = newData.himpunanA.length;
    const formattedHimpunanA = newData.himpunanA.map((item, i) => (
      <Fragment key={i}>
        <span style={{ color: 'red' }}>{item}</span>
        {himpunanALength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted himpunan B
    const himpunanBLength = newData.himpunanB.length;
    const formattedHimpunanB = newData.himpunanB.map((item, i) => (
      <Fragment key={i}>
        <span style={{ color: 'red' }}>{item}</span>
        {himpunanBLength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted semesta for A komplemen
    const formattedSemestaKomplemenA = himpunan.semesta.map((item, i) => (
      <Fragment key={i}>
        <span style={{ color: newData.himpunanA.includes(item) ? 'red' : 'black' }}>{item}</span>
        {semestaLength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted A komplemen
    const komplemenA = himpunan.semesta.filter((anggota) => !newData.himpunanA.includes(anggota));
    const komplemenALength = komplemenA.length;
    const formattedKomplemenA = komplemenA.map((item, i) => (
      <Fragment key={i}>
        <span style={{ color: 'black' }}>{item}</span>
        {komplemenALength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted semesta for B komplemen
    const formattedSemestaKomplemenB = himpunan.semesta.map((item, i) => (
      <Fragment key={i}>
        <span style={{ color: newData.himpunanB.includes(item) ? 'red' : 'black' }}>{item}</span>
        {semestaLength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted B komplemen
    const komplemenB = himpunan.semesta.filter((anggota) => !newData.himpunanB.includes(anggota));
    const komplemenBLength = komplemenB.length;
    const formattedKomplemenB = komplemenB.map((item, i) => (
      <Fragment key={i}>
        <span style={{ color: 'black' }}>{item}</span>
        {komplemenBLength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted  A-B
    const A_B = newData.himpunanA.filter((anggota) => !newData.himpunanB.includes(anggota));
    const A_BLength = A_B.length;
    const formattedA_B = A_B.map((item, i) => (
      <Fragment key={i}>
        <span>{item}</span>
        {A_BLength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted himpunan A for A-B
    const formattedABHimpunanA = newData.himpunanA.map((item, i) => (
      <Fragment key={i}>
        <span style={{ color: newData.himpunanB.includes(item) ? 'red' : 'black' }}>{item}</span>
        {himpunanALength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted  B-A
    const B_A = newData.himpunanB.filter((anggota) => !newData.himpunanA.includes(anggota));
    const B_ALength = B_A.length;
    const formattedB_A = B_A.map((item, i) => (
      <Fragment key={i}>
        <span>{item}</span>
        {B_ALength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    // Formatted himpunan B for B-A
    const formattedBAHimpunanB = newData.himpunanB.map((item, i) => (
      <Fragment key={i}>
        <span style={{ color: newData.himpunanA.includes(item) ? 'red' : 'black' }}>{item}</span>
        {himpunanBLength !== i + 1 ? ', ' : ''}
      </Fragment>
    ));

    setFormatted({
      ...formatted,
      himpunanA: formattedHimpunanA,
      himpunanB: formattedHimpunanB,
      semestaKomplemenA: formattedSemestaKomplemenA,
      komplemenA: formattedKomplemenA,
      semestaKomplemenB: formattedSemestaKomplemenB,
      komplemenB: formattedKomplemenB,
      A_B: formattedA_B,
      A_BhimpunanA: formattedABHimpunanA,
      B_A: formattedB_A,
      B_AhimpunanB: formattedBAHimpunanB,
    });
  };

  return (
    <Container className="p-3">
      <Row>
        <Col>
          {/* Input */}
          <Row className="mb-5">
            <Col>
              <Form>
                {/* Himpunan */}
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label
                      htmlFor="A"
                      className="d-block text-center font-weight-bold text-uppercase"
                    >
                      Himpunan A
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="A"
                      name="himpunanA"
                      onChange={handleInputChange}
                      maxLength={himpunan.semesta.length - 1}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label
                      htmlFor="B"
                      className="d-block text-center font-weight-bold text-uppercase"
                    >
                      Himpunan B
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="B"
                      name="himpunanB"
                      onChange={handleInputChange}
                      maxLength={himpunan.semesta.length - 1}
                      autoComplete="off"
                    />
                  </Form.Group>
                </Form.Row>
                {/* Button  */}
              </Form>
            </Col>
          </Row>
          {/* Output */}
          <Row>
            <Col xs={12} md={6} className="mb-2">
              <Card>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span className="font-weight-bold">A' atau A Komplemen</span> merupakan semua
                    anggota pada himpunan S yang bukan bagian dari himpunan A.
                  </Card.Subtitle>
                  <Card.Text className="mb-0">S&nbsp; = {formatted.semestaKomplemenA}</Card.Text>
                  <Card.Text className="mb-0">A&nbsp; = {formatted.himpunanA}</Card.Text>
                  <Card.Text className="mb-0">A' = {formatted.komplemenA}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="mb-2">
              <Card>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span className="font-weight-bold">B' atau B Komplemen</span> merupakan semua
                    anggota pada himpunan S yang bukan bagian dari himpunan B.
                  </Card.Subtitle>
                  <Card.Text className="mb-0">S&nbsp; = {formatted.semestaKomplemenB}</Card.Text>
                  <Card.Text className="mb-0">B&nbsp; = {formatted.himpunanB}</Card.Text>
                  <Card.Text className="mb-0">B' = {formatted.komplemenB}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="mb-2">
              <Card>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span className="font-weight-bold">A – B</span> merupakan semua anggota pada
                    himpunan A yang tidak dimiliki oleh himpunan B.
                  </Card.Subtitle>
                  <Card.Text className="mb-0">A = {formatted.A_BhimpunanA}</Card.Text>
                  <Card.Text className="mb-0">B = {formatted.himpunanB}</Card.Text>
                  <Card.Text className="mb-0">A – B = {formatted.A_B}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="mb-2">
              <Card>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span className="font-weight-bold">B – A</span> merupakan semua anggota pada
                    himpunan B yang tidak dimiliki oleh himpunan A.
                  </Card.Subtitle>
                  <Card.Text className="mb-0">B = {formatted.B_AhimpunanB}</Card.Text>
                  <Card.Text className="mb-0">A = {formatted.himpunanA}</Card.Text>
                  <Card.Text className="mb-0">B – A = {formatted.B_A}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
